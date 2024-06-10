“King of Melody” là một website giải trí dưới hình thức giải câu đố về âm nhạc được thiết kế bởi Nhóm 11 thuộc lớp NT208.O23.ANTT. Web được tạo ra xuất phát từ yêu cầu giải trí, thư giãn của con người và lấy nguồn cảm hứng từ chủ đề âm nhạc. Chi tiết về tổng quan và chức năng của trang web như sau:<br><br>
<img width="815" alt="image" src="https://github.com/zasure69/king_of_melody/assets/60498230/25333577-7418-42d1-870a-84db8b698f00">
<h3> Danh sách thành viên Nhóm 11</h3>
<ul>
  <li>Trần Văn Chiến - 22520156</li>
  <li>Nguyễn Huỳnh Duy - 22520330</li>
  <li>Nguyễn Khắc Hậu - 22520410</li>
  <li>Huỳnh Minh Hiển -22520415</li>
  <li>Ngô Trung Hiếu - 22520437</li>
</ul>

<h3>**TỔNG QUAN</h3>
<ul>
  <li>Frontend: HTML/CSS, JAVASCRIPT.</li>
  <li>Backend: NODEJS, EXPRESSJS.</li>
  <li>Cách thức thao tác bên người dùng: thao tác trên giao diện được thiết kế sẵn.</li>
  <li>Database: có database lưu trữ (MongoDB).</li>
</ul>
<h3>**SETUP MÔI TRƯỜNG</h3>
<ul>
  <li>1. Cài Nodejs bản 20.x trở lên</li>
  <li>2. Bật Terminal và di chuyển vào thư mục chứa source code</li>
  <li>3. Chạy lênh npm init</li>
  <li>4. Cài đặt các module cần thiết: chạy lệnh npm install tên_module_cài_đặt
    <ul>Các module cần cài đặt
      <li>express</li>
      <li>bcrypt</li>
      <li>cheerio</li>
      <li>dotenv</li>
      <li>connect-mongodb-session</li>
      <li>google-auth-library</li>
      <li>express-session</li>
      <li>howler</li>
      <li>husky</li>
      <li>howler</li>
      <li>lint-staged</li>
      <li>method-override</li>
      <li>mongoose</li>
      <li>morgan</li>
      <li>multer</li>
      <li>nodemailer</li>
      <li>nodemon</li>
      <li>passport</li>
      <li>passport-google-oauth20</li>
      <li>prettier</li>
      <li>readable-stream</li>
      <li>socket.io</li>
      <li>uuid</li>
    </ul>
  </li>
  <li>5. Chạy lệnh node src/index.js hoặc nodemon src/index.js để khởi động server</li>
  <li>Lưu ý: cần sửa đường dẫn web ở các file src/config/passport.js (dòng 12), src/app/controller/loginController.js (dòng 35), src/app/controller/resetpasswordController.js (dòng 106), src/playmultiplayer.js (dòng 1), src/playsingleplayer.js (dòng 1), src/resources/views/playmulti.hbs (dòng 10), src/resources/views/playsingle.hbs (dòng 10) thành http://localhost:port khi chạy localhost</li>
</ul>
<h3>**DOMAIN DEPLOY: https://kingofmelody-8911b7a7e907.herokuapp.com/</h3>
<h3>**HÌNH ẢNH TIÊU CHÍ CỘNG ĐIỂM</h3>
    <ul>
      <li>1. Video seminar<br>
        <img width="815" alt="image" src="https://github.com/zasure69/king_of_melody/assets/162142037/dfbfb0e4-7fe9-446d-91cd-34b9375a03a0">
        <br>
        Link youtube: https://www.youtube.com/watch?v=kNsVfo1MgcU
      </li>
      <li>2. Điểm SEO và Google PageSpeed Insight <br>
        <img width="815" alt="image" src="https://github.com/zasure69/king_of_melody/assets/162142037/454a94f9-3135-4056-82fa-9d26e7b4c5fd">
        <img width="815" alt="image" src="https://github.com/zasure69/king_of_melody/assets/162142037/545154d1-9a76-478d-90cb-e45fa81539b6">
        <img width="815" alt="image" src="https://github.com/zasure69/king_of_melody/assets/162142037/ba6badf8-cb6d-45da-bec6-12b7424b098f">
       <img width="815" alt="image" src="https://github.com/zasure69/king_of_melody/assets/162142037/aabc9e53-dec4-499b-b6ea-6f30cca7c419">
        <br>(Vì các page khác cần đăng nhập nên nhóm em không phân tích pagespeed được)
      </li>
      <li>3. Giao diện UI/UX đẹp</li>
      <li>4. Đã deploy lên cloud sử dụng heroku</li>
      <li>5. Có thể sử dụng trên cả máy tính và điện thoại</li>
    </ul>
<h3>**VỀ TÍNH NĂNG</h3>
<h4><i>* Về phía người dùng:</i></h4>
<ul>
  <li>Người dùng có thể thao tác trực tiếp với giao diện được thiết kế sẵn, giao diện trực quan và rất dễ tương tác, ví dụ như:
  <ul>
    <li>Giao diện đăng nhập, đăng ký: người chơi chỉ cần điền thông tin cơ bản như gmail, họ tên và tự tạo cho mình mật khẩu là đã có một tài khoản để chơi/ lưu trữ.</li>
    <li>Giao diện setting: được cài đặt một số tính năng cơ bản về âm lượng, tắt/ bật âm,… người chơi chỉ cần thao tác kéo thả hoặc click là có thể điều chỉnh được.</li>
    <li>Giao diện chơi game: nghe câu đố chỉ cần ấn nút “Play” là có thể phát, giải đố bằng cách nhập thông tin câu trả lời vào ô được bố trí sẵn và nút "Đoán" là đã xong giải đố.</li>
  </ul>
  </li>
  <li>Người chơi có thể xem các thông tin về số điểm, thứ hạng của bản thân tại các giao diện “Hồ sơ” và “Bảng xếp hạng”. Số điểm của bản thân trong quá trình chơi sẽ được tích lũy một cách tự động và được lưu trữ tại giao diện “Hồ sơ”, điểm của bạn cũng sẽ được sắp xếp lên bảng xếp hạng một cách tự động (nếu bạn được điểm cao).</li>
  <li>Người chơi có thể đổi tên người dùng trong phần "Hồ sơ" -> Bấm vào tên hiển thị phía trên bên phải -> Nhập tên người dùng mới và bấm "Thay đổi"</li>
  <li>Website cho phép người chơi được tham gia nhiều chế độ, nhiều mức độ khác nhau. Về mức độ chơi, người chơi có thể tham các mức độ “Khó” < “Tuyệt vọng” < “Địa ngục”, mỗi mức độ sẽ có độ khó và mức độ thú vị khác nhau để người chơi có thể trải nghiệm sự đa dạng và phong phú của âm nhạc, sẽ được trải nghiệm cảm giác “tuy lạ mà quen” trong giới âm nhạc. Về chế độ chơi, người chơi có thể tích lũy kinh nghiệm, kiến thức về bài hát tại chế độ “Thường”, hoặc có thể solo kinh nghiệm tại chế độ “Xếp hạng”.</li>
  <li>Trong chế độ "Xếp hạng", người chơi có thể gửi tin nhắn và icon đến người chơi đối diện.</li>
  <li> Trong giao diện "Hồ sơ", người chơi có thể thêm bài hát thông qua khi ấn nút "Thêm bài hát". Lúc này, người dùng cần nhập đầy đủ thông tin cần thiết như: tên bài hát, tên ca sĩ, đường dẫn của bài hát (nếu có) và thêm 1 đoạn nhạc dài 30 giây đối với bài hát không lời và 15 giây đối với bài hát có lời.</li>
  <li>Về vấn đề tài khoản và bảo mật: website sẽ đảm bảo an toàn và bảo mật về thông tin của những người chơi, chỉ hiển thị công khai một số thông tin cần thiết như “Username”.</li>
    <li>Người chơi có thể xóa tài khoản khi bấm nút xóa tài khoản trong phần "Hồ sơ"</li>
</ul>

<h4><i>* Về phía người quản lý:</i></h4>
<ul>
  <li>Người quản lý sẽ được thao tác, quản lý các thông tin trong database. Database của web “King of melody” bao gồm:
  <ul>
    <li>Thông tin người chơi: Tài khoản, mật khẩu, username hiển thị. Người quản lý phải đảm bảo về bảo mật thông tin người chơi. Có thể mã hóa các thông tin cần thiết.</li>
    <li>Thành tích người chơi: thông tin này sẽ được cập nhật tự động.</li>
    <li>Thông tin bài hát: Tên tác giả, tên bài hát.</li>
  </ul>
  </li>
  <li>Các thao tác mà người quản lý có thể làm:
    <ul>
      <li>
        Thêm/ xóa một câu đố: Người quản lý có thể truy cập vào database để chỉnh sửa các câu đố âm nhạc. Có thể thêm/ cập nhật lại câu đố hoặc là xóa đi một câu đố bị sai, lỗi thời.
      </li>
      <li>
        Có thể tạm ngưng quá trình chơi của tất cả người chơi (bảo trì): quá trình này chỉ được phép thực hiện khi cập nhật web, có thể là thêm một tính năng, cập nhật bộ câu đố hoặc sửa lỗi khi web có dấu hiệu bị lỗi.
      </li>
      <li>
        Người quản lý có thể cấm/ khóa một tài khoản truy cập web khi người dùng có dấu hiệu gian lận hoặc là có dấu hiệu tấn công web (Người quản lý sẽ được biết key giải mã thông tin để quản lý các tài khoản, người quản lý cũng có thể thay đổi key, cách thức mã hóa khác nếu trường hợp việc giải mã bị xâm nhập, tiết lộ).
      </li>   
    </ul>
  </li>
</ul>
<h3>**TRẢ LỜI CÂU HỎI SEMINAR GIỮA KÌ</h3>
<ul>
  <li>
    <h4>1. Cách routing sử dụng KoaJS</h4>
    <ul>
      <li>Routing trong KoaJS được thực hiện thông qua middleware koa-router.</li>
      <li><h4>Bước 1: Cài đặt koa-router</h4>
        Trước tiên, bạn cần cài đặt koa-router thông qua npm hoặc yarn: npm install koa-router
      </li>
      <li>
        <h4>Bước 2: Sử dụng koa-router</h4>
        Dưới đây là cách sử dụng koa-router để định nghĩa và xử lý các tuyến (routes) trong KoaJS.
        ```javascript
           const Koa = require('koa');
        const Router = require('koa-router');
        const app = new Koa();
        const router = new Router();
        // Định nghĩa tuyến cơ bản
        router.get('/', async (ctx) => {
          ctx.body = 'Welcome to the home page!';
        });
        router.get('/about', async (ctx) => {
          ctx.body = 'This is the about page!';
        });
        // Định nghĩa tuyến với tham số
        router.get('/user/:id', async (ctx) => {
          const userId = ctx.params.id;
          ctx.body = `User ID: ${userId}`;
        });
        // Định nghĩa tuyến POST
        router.post('/data', async (ctx) => {
          ctx.body = 'Data received!';
        });
        // Sử dụng router
        app
          .use(router.routes()) // Sử dụng các tuyến đã định nghĩa
          .use(router.allowedMethods()); // Xử lý các phương thức HTTP không được phép
        const PORT = 3000;
        app.listen(PORT, () => {
          console.log(`Server is running on http://localhost:${PORT}`);
        });```
      </li>
      <li>
        
      </li>
    </ul>
  </li>
</ul>
<h3>**LỜI KẾT</h3>
<p>
  Tóm lại, “King of melody” có đầy đủ các yêu cầu cơ bản mà một website cần có. Web có những chức năng cho cả người dùng lẫn người quản lý, có sự phân cấp rõ rệt và khoa học về các quyền thao tác, quyền truy cập trong website. Web có những giao diện cho người dùng rất trực quan, đa dạng, dễ thao tác và có tính bảo mật đảm bảo về thông tin người dùng. Do đó, “King of melody” là một trang web rất đáng người dùng trải nghiệm.
</p>
