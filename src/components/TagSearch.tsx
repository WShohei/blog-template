'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Select, { ActionMeta, GroupBase, StylesConfig } from 'react-select';
import Fuse from 'fuse.js';
import dynamic from 'next/dynamic';

// Dynamic import for client-side rendering only
const ReactSelect = dynamic(() => import('react-select'), {
    ssr: false,
}) as typeof Select;

type TagOption = {
    value: string;
    label: string;
    parent?: string;
    fullPath?: string; // Full path for the tag
};

type TagSearchProps = {
    allTags: string[];
    instanceId?: string;
};

export default function TagSearch({ allTags, instanceId = 'tag-search-select' }: TagSearchProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedTag, setSelectedTag] = useState<TagOption | null>(null);
    const [tagOptions, setTagOptions] = useState<TagOption[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    // Track client-side rendering
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Parse tags (supporting hierarchical tags like "a/b/c")
    useEffect(() => {
        const options: TagOption[] = [];

        allTags.forEach(tag => {
            if (tag.includes('/')) {
                // Process hierarchical tags
                const parts = tag.split('/');
                const label = parts[parts.length - 1]; // Last part is the label
                const parent = parts.slice(0, -1).join('/'); // Everything before the last part is the parent path

                options.push({
                    value: tag,
                    label: label,
                    parent: parent,
                    fullPath: tag
                });
            } else {
                // Process regular tags
                options.push({
                    value: tag,
                    label: tag,
                    fullPath: tag
                });
            }
        });

        setTagOptions(options);

        // Get tag from URL for initial selection
        const tagFromUrl = searchParams.get('tag');
        if (tagFromUrl) {
            const option = options.find(opt => opt.value === tagFromUrl);
            if (option) {
                setSelectedTag(option);
            }
        }
    }, [allTags, searchParams]);

    // Setup fuzzy search with Fuse.js
    const fuse = useMemo(() => new Fuse(tagOptions, {
        keys: ['label', 'parent', 'fullPath'], // Add fullPath to search targets
        threshold: 0.3,
        includeScore: true
    }), [tagOptions]);

    // Handle tag selection
    const handleTagChange = (
        selected: unknown,
        actionMeta: ActionMeta<unknown>
    ) => {
        const selectedOption = selected as TagOption | null;
        setSelectedTag(selectedOption);
        if (selectedOption) {
            router.push(`/tags/${encodeURIComponent(selectedOption.value)}`);
        }
    };

    // Handle input change
    const handleInputChange = (inputValue: string) => {
        setSearchQuery(inputValue);
    };

    // Custom filtering logic
    const filterOptions = () => {
        if (!searchQuery) {
            return selectOptions;
        }

        const results = fuse.search(searchQuery);
        const filteredOptions = results.map(result => result.item);

        // Organize filtered results by group
        const filteredGroups: Record<string, TagOption[]> = {};

        filteredOptions.forEach(option => {
            const groupName = option.parent || 'TOP';
            if (!filteredGroups[groupName]) {
                filteredGroups[groupName] = [];
            }
            filteredGroups[groupName].push(option);
        });

        return Object.keys(filteredGroups).map(key => ({
            label: key,
            options: filteredGroups[key]
        }));
    };

    // Customize group label display
    const formatGroupLabel = (data: GroupBase<unknown>) => (
        <div className="flex justify-between items-center">
            <span className="font-semibold">{data.label}</span>
            <span className="bg-cream-200 text-text text-xs rounded-full px-2 py-0.5">
                {data.options.length}
            </span>
        </div>
    );

    // Group tag options by parent tag
    const groupedOptions = tagOptions.reduce((groups: any, option) => {
        const groupName = option.parent || 'TOP';

        if (!groups[groupName]) {
            groups[groupName] = [];
        }

        groups[groupName].push(option);
        return groups;
    }, {});

    const selectOptions = Object.keys(groupedOptions).map(key => ({
        label: key,
        options: groupedOptions[key]
    }));

    // Filtered options based on search query
    const filteredSelectOptions = useMemo(() => filterOptions(), [searchQuery, selectOptions, fuse]);

    // Custom style configuration
    const customStyles: StylesConfig<TagOption, false> = {
        control: (base, state) => ({
            ...base,
            backgroundColor: '#FFFDF7', // cream-50
            borderColor: state.isFocused ? '#D8B54C' : '#FFEDB3', // primary or cream-300
            borderRadius: '9999px',
            boxShadow: state.isFocused ? '0 0 0 1px #D8B54C' : 'none',
            '&:hover': {
                borderColor: '#D8B54C', // primary
            }
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? '#D8B54C' // primary
                : state.isFocused
                    ? '#FFF9E6' // cream-100
                    : undefined,
            color: state.isSelected ? 'white' : '#4B3F26', // text
            '&:active': {
                backgroundColor: '#D8B54C', // primary
            }
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: '#FFFDF7', // cream-50
            borderColor: '#FFE799', // cream-400
            borderRadius: '0.75rem', // rounded-xl
        }),
        input: (base) => ({
            ...base,
            color: '#4B3F26', // text
        }),
        singleValue: (base) => ({
            ...base,
            color: '#4B3F26', // text
        }),
        multiValue: (base) => ({
            ...base,
            backgroundColor: '#FFF9E6', // cream-100
            borderRadius: '9999px',
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: '#4B3F26', // text
        }),
        multiValueRemove: (base) => ({
            ...base,
            color: '#4B3F26', // text
            '&:hover': {
                backgroundColor: '#FFE799', // cream-400
                color: '#4B3F26', // text
            }
        }),
        indicatorSeparator: (base) => ({
            ...base,
            backgroundColor: '#FFE799', // cream-400
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: '#8D7B4C', // secondary
            '&:hover': {
                color: '#D8B54C', // primary
            }
        }),
        clearIndicator: (base) => ({
            ...base,
            color: '#8D7B4C', // secondary
            '&:hover': {
                color: '#D8B54C', // primary
            }
        }),
        groupHeading: (base) => ({
            ...base,
            color: '#4B3F26', // text
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'none',
        }),
    };

    // Only render on client side to avoid SSR/CSR differences
    if (!isMounted) {
        return <div className="w-full max-w-md mx-auto h-10 bg-cream-100 rounded-full animate-pulse"></div>;
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <ReactSelect
                instanceId={instanceId}
                placeholder="Search"
                isClearable
                value={selectedTag}
                onChange={handleTagChange}
                onInputChange={handleInputChange}
                options={filteredSelectOptions}
                formatGroupLabel={formatGroupLabel}
                noOptionsMessage={() => "No tags found"}
                inputValue={searchQuery}
                styles={customStyles}
                classNames={{
                    control: (state) =>
                        `!bg-cream-50 border ${state.isFocused ? 'border-primary shadow-sm' : 'border-cream-300'} rounded-full`,
                    option: (state) =>
                        `${state.isFocused ? 'bg-cream-100' : ''} ${state.isSelected ? 'bg-primary text-white' : ''}`,
                    menu: () => "border border-cream-200 shadow-md rounded-xl mt-1 z-50 bg-cream-50",
                    groupHeading: () => "text-xs font-semibold text-text px-3 py-2",
                }}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary: '#D8B54C', // primary
                        primary25: '#FFF9E6', // cream-100
                        primary50: '#FFE799', // cream-400
                        primary75: '#FFE180', // cream-500
                        neutral0: '#FFFDF7', // cream-50
                        neutral5: '#FFF9E6', // cream-100
                        neutral10: '#FFF3CC', // cream-200
                        neutral20: '#FFEDB3', // cream-300
                        neutral30: '#FFE799', // cream-400
                        neutral40: '#8D7B4C', // secondary
                        neutral50: '#8D7B4C', // secondary
                        neutral60: '#A38728', // primary-dark
                        neutral70: '#6D5A14', // cream-800
                        neutral80: '#4B3F26', // text
                        neutral90: '#382D0A', // cream-900
                    },
                })}
            />
        </div>
    );
} 