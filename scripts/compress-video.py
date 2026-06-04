#!/usr/bin/env python3
"""
Video Compression Script for Background Videos
Optimizes videos for web background use - small file size, acceptable quality
"""

import subprocess
import sys
import os
from pathlib import Path

def compress_video(input_path, output_path=None, 
                   max_width=1280, 
                   fps=24, 
                   crf=32,
                   preset='slow'):
    """
    Compress video for background use with aggressive optimization.
    
    Args:
        input_path: Path to input video
        output_path: Path to output video (default: input_compressed.mp4)
        max_width: Maximum width in pixels (height scales proportionally)
        fps: Target frame rate (24 is smooth enough for backgrounds)
        crf: Constant Rate Factor (18-28 = high quality, 28-35 = medium, 35+ = low)
               For backgrounds: 30-35 is ideal
        preset: Encoding speed/compression tradeoff ('ultrafast' to 'veryslow')
                'slow' or 'medium' recommended for best compression
    """
    
    input_path = Path(input_path)
    
    if not input_path.exists():
        print(f"❌ Error: Input file not found: {input_path}")
        sys.exit(1)
    
    # Default output path
    if output_path is None:
        output_path = input_path.parent / f"{input_path.stem}-compressed{input_path.suffix}"
    else:
        output_path = Path(output_path)
    
    print(f"🎬 Compressing video for background use...")
    print(f"   Input:  {input_path}")
    print(f"   Output: {output_path}")
    print(f"\n⚙️  Settings:")
    print(f"   Max width: {max_width}px")
    print(f"   Frame rate: {fps} fps")
    print(f"   CRF: {crf} (higher = smaller file)")
    print(f"   Preset: {preset}")
    print()
    
    # FFmpeg command with aggressive compression for backgrounds
    cmd = [
        'ffmpeg',
        '-i', str(input_path),
        '-vf', f'scale={max_width}:-2,fps={fps}',  # Scale and reduce fps
        '-c:v', 'libx264',                           # H.264 codec
        '-preset', preset,                           # Encoding preset
        '-crf', str(crf),                            # Quality (higher = more compression)
        '-movflags', '+faststart',                   # Web optimization (metadata at start)
        '-pix_fmt', 'yuv420p',                       # Compatibility
        '-an',                                        # Remove audio (not needed for background)
        '-y',                                         # Overwrite output
        str(output_path)
    ]
    
    try:
        # Run FFmpeg
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode != 0:
            print(f"❌ FFmpeg error:\n{result.stderr}")
            sys.exit(1)
        
        # Compare file sizes
        input_size = input_path.stat().st_size
        output_size = output_path.stat().st_size
        reduction = ((input_size - output_size) / input_size) * 100
        
        print(f"✅ Compression complete!")
        print(f"\n📊 Results:")
        print(f"   Original:   {input_size / 1024 / 1024:.2f} MB")
        print(f"   Compressed: {output_size / 1024 / 1024:.2f} MB")
        print(f"   Reduction:  {reduction:.1f}%")
        print(f"\n💡 For even smaller file:")
        print(f"   - Increase CRF (try 35-38 for backgrounds)")
        print(f"   - Reduce max_width (try 960 or 720)")
        print(f"   - Use lower fps (try 15-20)")
        
    except FileNotFoundError:
        print("❌ Error: FFmpeg not found. Please install FFmpeg:")
        print("   Windows: winget install FFmpeg")
        print("   macOS:   brew install ffmpeg")
        print("   Linux:   sudo apt install ffmpeg")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)


def main():
    if len(sys.argv) < 2:
        print("Usage: python compress-video.py <input_video> [output_video]")
        print("\nExample:")
        print("  python compress-video.py ironbci-video.mp4")
        print("  python compress-video.py ironbci-video.mp4 ironbci-bg.mp4")
        print("\nFor custom settings, edit the script or use:")
        print("  python compress-video.py <input> <output> <max_width> <fps> <crf>")
        sys.exit(1)
    
    input_video = sys.argv[1]
    output_video = sys.argv[2] if len(sys.argv) > 2 else None
    
    # Optional custom parameters
    max_width = int(sys.argv[3]) if len(sys.argv) > 3 else 1280
    fps = int(sys.argv[4]) if len(sys.argv) > 4 else 24
    crf = int(sys.argv[5]) if len(sys.argv) > 5 else 32
    
    compress_video(
        input_video,
        output_video,
        max_width=max_width,
        fps=fps,
        crf=crf,
        preset='slow'  # Best compression
    )


if __name__ == '__main__':
    main()
