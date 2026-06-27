"""
Convert JFIF images to PNG format for team photos.
"""

from PIL import Image
import os

# Get the public directory
script_dir = os.path.dirname(os.path.abspath(__file__))
public_dir = os.path.join(os.path.dirname(script_dir), 'public')

# List of JFIF files to convert
jfif_files = ['ildar.jfif', 'youssef.jfif']

for filename in jfif_files:
    jfif_path = os.path.join(public_dir, filename)
    
    if not os.path.exists(jfif_path):
        print(f"⚠️  {filename} not found, skipping...")
        continue
    
    # Open the JFIF image
    img = Image.open(jfif_path)
    
    # Convert to RGB if necessary (PNG doesn't support CMYK)
    if img.mode in ('RGBA', 'LA'):
        pass  # Already has alpha channel
    elif img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Create PNG filename
    png_filename = filename.replace('.jfif', '.png')
    png_path = os.path.join(public_dir, png_filename)
    
    # Save as PNG with optimization
    img.save(png_path, 'PNG', optimize=True)
    
    # Get file sizes
    jfif_size = os.path.getsize(jfif_path) / 1024  # KB
    png_size = os.path.getsize(png_path) / 1024  # KB
    
    print(f"✓ Converted {filename} → {png_filename}")
    print(f"  JFIF: {jfif_size:.1f} KB → PNG: {png_size:.1f} KB")
    print()

print("✓ All conversions complete!")
