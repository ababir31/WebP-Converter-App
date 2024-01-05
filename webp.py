from PIL import Image
import os

def convert_to_webp(input_dir, output_dir, quality=80):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for filename in os.listdir(input_dir):
        if filename.endswith(".jpg"):
            img = Image.open(os.path.join(input_dir, filename))
            webp_filename = os.path.splitext(filename)[0] + ".webp"
            img.save(os.path.join(output_dir, webp_filename), "webp", quality=quality)

# Usage
convert_to_webp('images/jpg', 'jpg-img', quality=80)
