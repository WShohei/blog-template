---
title: "Testing Deep Hierarchy Tags"
date: "2024-03-28"
tags: ["test", "hierarchy/level1/level2", "frontend/framework/react", "category/subcategory/type/specific"]
excerpt: "A test article for tags with 3 or more hierarchy levels."
---

# Testing Deep Hierarchy Tags

This article was created to test if hierarchical tags with 3 or more levels work correctly.

## Examples of Hierarchical Tags

This article has the following hierarchical tags:

- test (regular tag)
- hierarchy/level1/level2 (3 levels)
- frontend/framework/react (3 levels)
- category/subcategory/type/specific (4 levels)

## Expected Behavior

- Clicking on each tag will navigate to the corresponding tag page
- Typing "hierarchy" in the tag search will show "hierarchy/level1/level2" as a suggestion
- Typing "level2" in the tag search will also show "hierarchy/level1/level2" as a suggestion
- Typing "framework" in the tag search will show "frontend/framework/react" as a suggestion
- Typing "type" in the tag search will show "category/subcategory/type/specific" as a suggestion 