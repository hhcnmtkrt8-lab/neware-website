from PIL import Image, ImageDraw, ImageFont
import os

def load_font(size, bold=False):
    """Try to load a suitable font on Windows"""
    font_paths = []
    if bold:
        font_paths = [
            "C:/Windows/Fonts/arialbd.ttf",
            "C:/Windows/Fonts/arialuni.ttf",
            "C:/Windows/Fonts/segoeuib.ttf",
            "C:/Windows/Fonts/tahomabd.ttf",
        ]
    else:
        font_paths = [
            "C:/Windows/Fonts/arial.ttf",
            "C:/Windows/Fonts/arialuni.ttf",
            "C:/Windows/Fonts/segoeui.ttf",
            "C:/Windows/Fonts/tahoma.ttf",
        ]
    
    for path in font_paths:
        try:
            return ImageFont.truetype(path, size)
        except:
            continue
    
    # Fallback to default
    return ImageFont.load_default()

def hex_to_rgb(hex_color):
    """Convert hex color to RGB tuple"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def create_og_image(lang='en'):
    # Create 1200x630 image
    width, height = 1200, 630
    bg_color = hex_to_rgb('0f172a')
    img = Image.new('RGB', (width, height), color=bg_color)
    draw = ImageDraw.Draw(img)
    
    # Draw subtle grid pattern
    grid_color = hex_to_rgb('1e3a5f')
    for x in range(0, width, 60):
        draw.line([(x, 0), (x, height)], fill=grid_color, width=1)
    for y in range(0, height, 60):
        draw.line([(0, y), (width, y)], fill=grid_color, width=1)
    
    # Draw glow effect (large semi-transparent circles)
    glow_positions = [(600, 315), (300, 200), (900, 400)]
    for gx, gy in glow_positions:
        for r in range(200, 50, -20):
            alpha = int(255 * (1 - r/200) * 0.15)
            color = (30, 80 + int(50*(1-r/200)), 150 + int(50*(1-r/200)))
            draw.ellipse([(gx-r, gy-r), (gx+r, gy+r)], fill=color)
    
    # Content area settings
    center_x = width // 2
    
    # Draw NEWARE brand name
    font_brand = load_font(72, bold=True)
    brand_text = "NEWARE"
    brand_bbox = draw.textbbox((0, 0), brand_text, font=font_brand)
    brand_width = brand_bbox[2] - brand_bbox[0]
    draw.text((center_x - brand_width // 2, 60), brand_text, fill=(255, 255, 255), font=font_brand)
    
    # Draw decorative line under brand
    line_y = 145
    line_width = 350
    draw.rectangle([(center_x - line_width//2, line_y), (center_x + line_width//2, line_y + 3)], fill=(37, 99, 235))
    
    # Headline text based on language
    headlines = {
        'en': ("Precision Battery", "Testing Equipment"),
        'zh': ("精密电池", "测试设备"),
        'vi': ("Thiết bị kiểm tra pin", "chính xác cao")
    }
    
    headline = headlines[lang]
    font_headline = load_font(56, bold=True)
    
    # First line of headline
    hl1_bbox = draw.textbbox((0, 0), headline[0], font=font_headline)
    hl1_width = hl1_bbox[2] - hl1_bbox[0]
    draw.text((center_x - hl1_width // 2, 180), headline[0], fill=(255, 255, 255), font=font_headline)
    
    # Second line of headline
    hl2_bbox = draw.textbbox((0, 0), headline[1], font=font_headline)
    hl2_width = hl2_bbox[2] - hl2_bbox[0]
    draw.text((center_x - hl2_width // 2, 245), headline[1], fill=(96, 165, 250), font=font_headline)
    
    # Stats cards
    stats = [
        ("1000Hz", "Sampling Rate"),
        ("0.02%", "Accuracy"),
        ("70%+", "Efficiency"),
        ("8 Series", "Product Line")
    ]
    
    card_width = 200
    card_height = 100
    card_spacing = 40
    total_cards_width = 4 * card_width + 3 * card_spacing
    cards_start_x = (width - total_cards_width) // 2
    card_y = 350
    
    for i, (value, label) in enumerate(stats):
        card_x = cards_start_x + i * (card_width + card_spacing)
        
        # Card background
        card_color = hex_to_rgb('1e3a5f')
        draw.rounded_rectangle(
            [(card_x, card_y), (card_x + card_width, card_y + card_height)],
            radius=10,
            fill=card_color
        )
        
        # Card border glow
        draw.rounded_rectangle(
            [(card_x, card_y), (card_x + card_width, card_y + card_height)],
            radius=10,
            outline=(37, 99, 235),
            width=2
        )
        
        # Stat value
        font_stat_value = load_font(36, bold=True)
        sv_bbox = draw.textbbox((0, 0), value, font=font_stat_value)
        sv_width = sv_bbox[2] - sv_bbox[0]
        draw.text((card_x + (card_width - sv_width) // 2, card_y + 15), value, fill=(255, 255, 255), font=font_stat_value)
        
        # Stat label
        font_stat_label = load_font(18)
        sl_bbox = draw.textbbox((0, 0), label, font=font_stat_label)
        sl_width = sl_bbox[2] - sl_bbox[0]
        draw.text((card_x + (card_width - sl_width) // 2, card_y + 60), label, fill=(148, 163, 184), font=font_stat_label)
    
    # Brand line
    brand_line = "Since 1998  |  150+ Countries  |  32,000+ Customers"
    font_brand_line = load_font(24)
    bl_bbox = draw.textbbox((0, 0), brand_line, font=font_brand_line)
    bl_width = bl_bbox[2] - bl_bbox[0]
    draw.text((center_x - bl_width // 2, 475), brand_line, fill=(148, 163, 184), font=font_brand_line)
    
    # Website URL
    url_text = "neware.com.cn"
    font_url = load_font(32, bold=True)
    url_bbox = draw.textbbox((0, 0), url_text, font=font_url)
    url_width = url_bbox[2] - url_bbox[0]
    draw.text((center_x - url_width // 2, 565), url_text, fill=(96, 165, 250), font=font_url)
    
    # Add decorative corner elements
    corner_size = 80
    
    # Top-left corner
    draw.line([(20, 20), (20 + corner_size, 20)], fill=(37, 99, 235), width=3)
    draw.line([(20, 20), (20, 20 + corner_size)], fill=(37, 99, 235), width=3)
    
    # Top-right corner
    draw.line([(width - 20 - corner_size, 20), (width - 20, 20)], fill=(37, 99, 235), width=3)
    draw.line([(width - 20, 20), (width - 20, 20 + corner_size)], fill=(37, 99, 235), width=3)
    
    # Bottom-left corner
    draw.line([(20, height - 20), (20 + corner_size, height - 20)], fill=(37, 99, 235), width=3)
    draw.line([(20, height - 20 - corner_size), (20, height - 20)], fill=(37, 99, 235), width=3)
    
    # Bottom-right corner
    draw.line([(width - 20 - corner_size, height - 20), (width - 20, height - 20)], fill=(37, 99, 235), width=3)
    draw.line([(width - 20, height - 20 - corner_size), (width - 20, height - 20)], fill=(37, 99, 235), width=3)
    
    return img

# Create output directory if needed
os.makedirs('public', exist_ok=True)

# Create each language variant
print("Generating English OG image...")
img_en = create_og_image('en')
img_en.save('public/og-en.png', 'PNG')
print("  Saved: public/og-en.png")

print("Generating Chinese OG image...")
img_zh = create_og_image('zh')
img_zh.save('public/og-zh.png', 'PNG')
print("  Saved: public/og-zh.png")

print("Generating Vietnamese OG image...")
img_vi = create_og_image('vi')
img_vi.save('public/og-vi.png', 'PNG')
print("  Saved: public/og-vi.png")

print("\nAll OG images generated successfully!")
print("Files created:")
print("  - public/og-en.png")
print("  - public/og-zh.png")
print("  - public/og-vi.png")
