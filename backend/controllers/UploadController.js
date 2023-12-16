import path from "path";
import { fileURLToPath } from 'url';

export const Upload = async (req, res) => {
    try {
        const img = req.files.image;

        const newImgName = encodeURI((Date.now() + "-" + img.name).replace(/ /g, '_'));
        
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        img.mv(`${__dirname}/../../frontend/public/uploads/${newImgName}`, err => {
            if (err) {
                console.error(err)
                return res.status(500).json({message: err})
            }

            res.json({
                imgName: img.name,
                imgPath: `/uploads/${newImgName}`
            })
        });

    } catch (err) {
        console.error(err)
        res.json({message: "failed"})
    }
}