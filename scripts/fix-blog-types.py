import re
import sys

files = [
    r"D:\Neware-Website\src\data\blog\product-guides.ts",
    r"D:\Neware-Website\src\data\blog\technical-deep-dives.ts",
]

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = re.sub(r'^\s*categoryZh:.*,\n', '', content, flags=re.MULTILINE)
    new_content = re.sub(r'^\s*tagsZh:.*,\n', '', new_content, flags=re.MULTILINE)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    removed_cat = len(re.findall(r'^\s*categoryZh:', content, re.MULTILINE))
    removed_tags = len(re.findall(r'^\s*tagsZh:', content, re.MULTILINE))
    print(f"Processed {filepath}: removed {removed_cat} categoryZh lines, {removed_tags} tagsZh lines")

print("Done!")
