const songSchema = require('../models/Song');
//const {mongooseToObject} = require('../../util/mongoose');
const cheerio = require('cheerio');
const fs = require('fs');

class playmultiController {
    index(req, res) {
        songSchema.aggregate([
            { $match: { mode: { $in: ["hard", "hell", "no hope"] } } },
            { $sample: { size: 10} }
            ])
            .exec()
            .then((songs) => {
                res.render('playmulti', {songs: JSON.stringify(songs)});
                // const html = fs.readFileSync('../../resources/views/playmulti.hbs', 'utf-8');
                // const $ = cheerio.load(html);
                // // Thay đổi thuộc tính của thẻ bất kỳ
                // let targetElement = $('#ctrlIcon'); // Thay 'selector' bằng CSS selector của thẻ cần thay đổi thuộc tính
                // targetElement.attr('class', 'fa-solid fa-pause'); // Thay 'attribute' bằng tên thuộc tính cần thay đổi, 'new value' là giá trị mới
                // // Lưu lại nội dung HTML sau khi thay đổi thuộc tính
                // const modifiedTemplate = $.html();
                // // Gửi template đã thay đổi về phía client
                // res.send(modifiedTemplate);
                // const audioPlayer = document.createElement('audio');
                // const audioSource = document.createElement('source');
                // importSongFromBase64(song[0].content, audioPlayer, audioSource);
                //console.log('Danh sách bài hát: ', song);
            })
            .catch((error) => {
                res.send("<h1>Không thể truy cập danh sách bài hát.</h1>");
            })
        //     let currentSongIndex = 0;
        
        //     // Chạy bài hát đầu tiên
        //     playSong(songs[currentSongIndex]);
        
        //     // Xử lý khi kết thúc một bài hát
        //     audioPlayer.addEventListener('ended', () => {
        //       currentSongIndex++;
        
        //       // Kiểm tra nếu đã hết danh sách bài hát
        //       if (currentSongIndex >= songs.length) {
        //         console.log('Đã phát hết danh sách bài hát');
        //         return;
        //       }
        
        //       // Chơi bài hát tiếp theo
        //       playSong(songs[currentSongIndex]);
        //     });
        //   })
        //   .catch((error) => {
        //     console.error(error);
        // });
    }
    
}

module.exports = new playmultiController;