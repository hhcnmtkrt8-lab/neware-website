import re

files = [
    r"D:\Neware-Website\src\data\blog\product-guides.ts",
    r"D:\Neware-Website\src\data\blog\technical-deep-dives.ts",
]

# First fix: remove publishedAt, replace with date
# Second fix: remove the extra base fields (title, summary, content, category, author, date)
# since they duplicate titleEn, summaryEn, contentEn, categoryEn, authorEn, dateEn

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace publishedAt with date
    content = re.sub(r'^\s*publishedAt: "([^"]+)",', r'    date: "\1",', content, flags=re.MULTILINE)

    # Replace base fields with just the locale-specific ones
    # title: -> remove (keep titleEn, titleZh, titleVi which are already there)
    # Remove lines like:     title: "...",
    content = re.sub(r'^\s*title: "[^"]*",\n', '', content, flags=re.MULTILINE)
    # summary:
    content = re.sub(r'^\s*summary: "[^"]*",\n', '', content, flags=re.MULTILINE)
    # content:
    content = re.sub(r'^\s*content: `<[^`]*`,\n', '', content, flags=re.MULTILINE)
    # category:
    content = re.sub(r'^\s*category: "[^"]*",\n', '', content, flags=re.MULTILINE)
    # author:
    content = re.sub(r'^\s*author: "[^"]*",\n', '', content, flags=re.MULTILINE)
    # date:
    content = re.sub(r'^\s*date: "[^"]*",\n', '', content, flags=re.MULTILINE)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    # Count removals
    title_count = len(re.findall(r'^\s*title: "[^"]*",', content, re.MULTILINE))
    print(f"Done: {filepath}")

print("All done!")
