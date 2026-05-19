import re

files = [
    r"D:\Neware-Website\src\data\blog\product-guides.ts",
    r"D:\Neware-Website\src\data\blog\technical-deep-dives.ts",
]

# Field mappings: old_field -> new_field
# From the BlogPost interface in blog-posts.ts:
# title -> titleEn, summary -> summaryEn, author -> authorEn,
# date -> dateEn, content -> contentEn, category -> categoryEn
# Also publishedAt -> date (since publishedAt doesn't exist in the interface)

field_mappings = {
    'title:': 'titleEn:',
    'titleZh:': 'titleZh:',
    'titleVi:': 'titleVi:',
    'summary:': 'summaryEn:',
    'summaryZh:': 'summaryZh:',
    'summaryVi:': 'summaryVi:',
    'content:': 'contentEn:',
    'contentZh:': 'contentZh:',
    'contentVi:': 'contentVi:',
    'category:': 'categoryEn:',
    'categoryZh:': 'categoryZh:',
    'categoryVi:': 'categoryVi:',
    'author:': 'authorEn:',
    'date:': 'dateEn:',
    'publishedAt:': 'date:',
}

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content
    for old, new in field_mappings.items():
        if old in new_content:
            new_content = new_content.replace(old, new)
            print(f"  {filepath}: replaced '{old}' -> '{new}'")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Done: {filepath}")

print("All done!")
