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
      Việc xử lý routing trong KoaJS thường được thực hiện thông qua một middleware bổ sung, phổ biến nhất là `koa-router`. Dưới đây là hướng dẫn cơ bản về cách thiết lập và sử dụng routing với KoaJS:
          <br><h5>1. Cài đặt Koa và Koa Router</h5>
          Trước hết, bạn cần cài đặt Koa và Koa Router bằng cách sử dụng npm:
          <br>
          <code>npm install koa koa-router</code>
          <br>
          <h5>2. Tạo ứng dụng Koa cơ bản với routing</h5>
          Dưới đây là một ví dụ về cách thiết lập một ứng dụng Koa cơ bản và sử dụng Koa Router để xử lý routing:<br>
          <img width="500" alt="image" src="https://github.com/zasure69/king_of_melody/assets/162142037/e112f1e7-14cf-44e5-ac9b-f467bdbdca97">
          <h5>3. Chi tiết các phương thức và phương pháp</h5>
          <ul>
            <li>router.get(path, handler): Định nghĩa một route GET.</li>
            <li>router.post(path, handler): Định nghĩa một route POST.</li>
            <li>router.put(path, handler): Định nghĩa một route PUT.</li>
            <li>router.delete(path, handler): Định nghĩa một route DELETE.</li>
            <li>router.routes(): Trả về một middleware tổng hợp từ các route đã định nghĩa.</li>
            <li>router.allowedMethods(): Trả về một middleware xử lý các phương thức không được phép.</li>
          </ul>
          <h5>4. Middleware trong KoaJS</h5>
          KoaJS rất mạnh mẽ nhờ vào hệ thống middleware của nó. Bạn có thể thêm các middleware khác để xử lý nhiều tác vụ khác nhau. Dưới đây là ví dụ về cách thêm middleware để xử lý JSON request body:
          <br>
          <code>npm install koa-bodyparser</code>
          <br>
          <img width="500" alt="image" src="https://github.com/zasure69/king_of_melody/assets/162142037/12719b77-f992-4c41-b162-8d33bdfec774">
          <h5>5. Ví dụ về routing kết hợp với middleware</h5>
          <img width="500" alt="image" src="https://github.com/zasure69/king_of_melody/assets/162142037/68542023-776f-4011-8ba4-58260e3647a5">
    </ul>
  </li>
  <li>
    <h4>2. KoaJS có hỗ trợ gì cho việc xử lý và phân tích dữ liệu đầu vào từ các yêu cầu của HTTP</h4>
    KoaJS có nhiều cách để hỗ trợ việc xử lý và phân tích dữ liệu đầu vào từ các yêu cầu HTTP. Dưới đây là một số phương pháp phổ biến và các middleware hữu ích mà bạn có thể sử dụng trong ứng dụng KoaJS để xử lý dữ liệu đầu vào:
    <h5>Xử lý body của yêu cầu</h5>
    <h6>Sử dụng koa-bodyparser:</h6>
    koa-bodyparser là một middleware phổ biến giúp bạn phân tích (parse) body của các yêu cầu HTTP. Nó hỗ trợ cả JSON, URL-encoded, và dữ liệu thô.
    <h6>Cài đặt koa-bodyparser:</h6>
    <code>npm install koa-bodyparser</code><br>
    <h6>Sử dụng koa-bodyparser:</h6>
    <img width="500" alt="image" src="https://github.com/zasure69/king_of_melody/assets/162142037/2982191d-fb07-4c48-bb4b-42a1f8dd3bc5">
    <br>
    <h6>Sử dụng koa-body</h6>
    koa-body là một middleware mạnh mẽ hơn, hỗ trợ thêm việc xử lý file uploads.
    <br>
    <code>npm install koa-body</code><br>
    Sử dụng koa-body:<br>
      <img width="500" alt="image" src="https://github.com/zasure69/king_of_melody/assets/162142037/73049bac-1e12-442c-94ec-5bf434880560">
    <h5>Xử lý query string và params</h5>
    KoaJS cung cấp các thuộc tính của đối tượng ctx.request để truy cập các query string và route params.
    <h6>Truy cập query string</h6>
    Bạn có thể truy cập các query string trực tiếp từ ctx.query hoặc ctx.request.query.<br>
      <img width="500" alt="image" src="https://github.com/zasure69/king_of_melody/assets/162142037/ddc9050c-84ee-4d73-82be-9a6211fab19c">
    <h6>Truy cập route params</h6>
    Sử dụng koa-router để truy cập các route params.<br>
      <img width="500" alt="image" src="https://github.com/zasure69/king_of_melody/assets/162142037/960b6023-72c4-4e09-b8d7-d68d0b037d7d">
    <h5>Xử lý headers</h5>
    Bạn có thể truy cập các headers từ ctx.request.headers.
      <img width="500" alt="image" src="https://github.com/zasure69/king_of_melody/assets/162142037/3671dcda-9f81-4c6b-a773-233edc995472">
    <h5>Xử lý cookies</h5>
    <br>
    <h6>Sử dụng koa-cookie hoặc koa-session để xử lý cookies.</h6>
    Sử dụng koa-cookie<br>
    Cài đặt koa-cookie:<code>npm install koa-cookie</code><br>
    Sử dụng koa-cookie:<br>
    <img width="500" alt="image" src="https://github.com/zasure69/king_of_melody/assets/162142037/9da78621-2978-4957-bb1a-234d5d5c8af2">
    <br>
    Sử dụng koa-session
    <br>
    Cài đặt koa-session:<code>npm install koa-session</code><br>
    Sử dụng koa-session:<br>
      <img width="500" alt="image" src="https://github.com/zasure69/king_of_melody/assets/162142037/66be6406-e6d9-4c3e-95a5-259c8ea7c37f">
  </li>
  <li>
    <h4>3. Những ưu điểm của middleware trong koajs so với các framework khác</h4>
    Middleware trong KoaJS có một số ưu điểm nổi bật so với các framework khác, như Express. Dưới đây là một số ưu điểm chính:
    <h5>Thiết kế hiện đại và gọn gàng</h5>
    KoaJS sử dụng async/await, giúp code trở nên gọn gàng và dễ đọc hơn so với cách sử dụng callback hoặc promise trong các framework cũ hơn. Điều này làm giảm đáng kể nguy cơ callback hell và giúp dễ dàng quản lý luồng xử lý bất đồng bộ.
    <h5>Middleware dạng đơn giản và thuần túy</h5>
    KoaJS sử dụng một hệ thống middleware thuần túy và đơn giản, nơi mỗi middleware là một hàm async. Middleware trong KoaJS được tổ chức thành một chuỗi xử lý (stack) mà mỗi middleware có thể gọi tiếp theo (next) hoặc dừng lại. Điều này mang lại sự linh hoạt cao trong việc kiểm soát luồng xử lý.
    <img width="500" alt="image" src="https://github.com/zasure69/king_of_melody/assets/162142037/b47f5a68-0f61-483c-b949-5c0d33cdfd7a">
    <h5>Kiến trúc nhỏ gọn, tập trung vào lõi</h5>
    KoaJS được thiết kế để trở thành một framework nhỏ gọn, chỉ cung cấp những tính năng cơ bản và cần thiết nhất. Các tính năng mở rộng được thêm vào thông qua các middleware tùy chọn. Điều này giúp ứng dụng KoaJS có kích thước nhỏ và hiệu suất cao.
    <h5>Hiệu suất cao</h5>
    Nhờ vào thiết kế gọn nhẹ và tối ưu, KoaJS thường có hiệu suất cao hơn so với các framework khác. Điều này đặc biệt quan trọng đối với các ứng dụng cần xử lý lượng lớn request hoặc yêu cầu hiệu suất cao.
    <h5>Xử lý lỗi mạnh mẽ và nhất quán</h5>
    KoaJS có cơ chế xử lý lỗi mạnh mẽ. Bằng cách sử dụng async/await và try/catch, bạn có thể dễ dàng bắt và xử lý lỗi trong middleware mà không cần các cấu trúc phức tạp.<br>
    <img width="500" alt="image" src="https://github.com/zasure69/king_of_melody/assets/162142037/33b07830-3029-475b-872d-a367a37e1a95">
    <h5>Dễ dàng tùy chỉnh và mở rộng</h5>
    KoaJS cho phép bạn dễ dàng viết và sử dụng các middleware tùy chỉnh. Bạn có thể thêm hoặc thay thế các middleware theo nhu cầu của ứng dụng mà không gặp khó khăn.
    <h5>Tính mô-đun cao</h5>
    KoaJS khuyến khích việc sử dụng các middleware độc lập và tái sử dụng. Bạn có thể dễ dàng tìm thấy hoặc tạo ra các middleware cho các tác vụ phổ biến như xử lý request body, xác thực, logging, v.v. Điều này giúp việc xây dựng và duy trì ứng dụng trở nên dễ dàng hơn.
    <h5>Hỗ trợ tốt cho việc quản lý trạng thái</h5>
    KoaJS cung cấp context (ctx) cho mỗi request, giúp bạn dễ dàng lưu trữ và quản lý thông tin liên quan đến request đó. Context này có thể được chia sẻ giữa các middleware, giúp giảm thiểu việc phải truyền dữ liệu giữa các hàm xử lý.
  </li>
</ul>
<h3>**LỜI KẾT</h3>
<p>
  Tóm lại, “King of melody” có đầy đủ các yêu cầu cơ bản mà một website cần có. Web có những chức năng cho cả người dùng lẫn người quản lý, có sự phân cấp rõ rệt và khoa học về các quyền thao tác, quyền truy cập trong website. Web có những giao diện cho người dùng rất trực quan, đa dạng, dễ thao tác và có tính bảo mật đảm bảo về thông tin người dùng. Do đó, “King of melody” là một trang web rất đáng người dùng trải nghiệm.
</p>
