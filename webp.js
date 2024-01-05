const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

function convert_to_webp(input_dir, output_dir, targetSizeKB = 80) {
	if (!fs.existsSync(output_dir)) {
		fs.mkdirSync(output_dir);
	}

	fs.readdirSync(input_dir).forEach((file) => {
		const ext = path.extname(file);
		if (ext === ".jpg" || ext === ".png") {
			const img = sharp(path.join(input_dir, file));
			const webp_filename = path.join(
				output_dir,
				path.basename(file, ext) + ".webp"
			);

			img.toBuffer()
				.then((data) => {
					let quality = Math.round(
						(targetSizeKB * 1024 * 100) / data.length
					);
					quality = Math.min(100, quality); // Quality cannot exceed 100
					return sharp(data)
						.webp({ quality: quality })
						.toFile(webp_filename);
				})
				.catch((err) => console.error(err));
		}
	});
}

// Usage
convert_to_webp("input-dir", "output-dir", 80);
