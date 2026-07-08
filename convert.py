import os
import sys
from PIL import Image, ImageSequence

try:
    import cv2
    import numpy as np
except ImportError:
    import subprocess
    print("Installing opencv-python and numpy...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "opencv-python", "numpy"])
    import cv2
    import numpy as np

def convert_webp_to_mp4(webp_path, mp4_path, duration_seconds=15):
    if not os.path.exists(webp_path):
        print(f"Error: {webp_path} not found.")
        return

    print(f"Opening {webp_path}...")
    im = Image.open(webp_path)
    
    # Extract frames and durations
    frames = []
    durations = []
    
    for frame in ImageSequence.Iterator(im):
        # Convert frame to RGB numpy array
        rgb_frame = frame.convert('RGB')
        numpy_frame = np.array(rgb_frame)
        # Convert RGB to BGR for OpenCV
        bgr_frame = cv2.cvtColor(numpy_frame, cv2.COLOR_RGB2BGR)
        frames.append(bgr_frame)
        durations.append(frame.info.get('duration', 50)) # default 50ms

    if not frames:
        print("No frames found in webp.")
        return

    # Calculate average frame rate
    avg_duration = sum(durations) / len(durations)
    fps = 1000.0 / avg_duration
    print(f"Detected {len(frames)} frames, average duration {avg_duration:.2f}ms, estimated FPS: {fps:.2f}")

    height, width, _ = frames[0].shape
    
    # Make video loop to reach target duration
    total_frames_needed = int(fps * duration_seconds)
    loop_count = (total_frames_needed // len(frames)) + 1
    
    extended_frames = []
    for _ in range(loop_count):
        extended_frames.extend(frames)
    extended_frames = extended_frames[:total_frames_needed]

    # Write video
    print(f"Writing {mp4_path} at {width}x{height} resolution, {fps:.2f} FPS...")
    fourcc = cv2.VideoWriter_fourcc(*'mp4v') # highly compatible mp4 codec
    video = cv2.VideoWriter(mp4_path, fourcc, fps, (width, height))
    
    for frame in extended_frames:
        video.write(frame)
        
    video.release()
    print("Video conversion complete!")

if __name__ == "__main__":
    convert_webp_to_mp4("public/market_bg.webp", "public/market_bg.mp4")
