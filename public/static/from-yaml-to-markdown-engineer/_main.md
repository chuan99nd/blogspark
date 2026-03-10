# Từ YAML Engineer đến Markdown Engineer

Có một thời, tôi tự hào giới thiệu mình là **Software Engineer**.
Rồi thực tế dạy tôi rằng: phần lớn thời gian tôi không viết code — tôi viết YAML.

### 1. YAML: Ngôn ngữ tình đầu (mắc mệt)

Mối quan hệ của tôi với YAML bắt đầu như mọi mối tình đầu: đầy hy vọng, không hiểu gì, và rất nhiều đau thương.

\`\`\`yaml
steps:
  - name: Deploy to production
    run: echo "What could go wrong?"
\`\`\`

YAML trông vô hại. Không ngoặc nhọn, không chấm phẩy. Tối giản và thanh lịch.

Cho đến khi bạn indent sai **một space**.
Pipeline fail đỏ lòm. Slack nổ notification ầm ĩ.
YAML không hét vào mặt bạn như compiler. Nó im lặng. Rồi đâm bạn từ phía sau. Giống một người yêu cũ: không cãi vã, chỉ âm thầm block mọi phương thức liên lạc.

CV tôi ghi SRE, nhưng git log lại kể câu chuyện khác:
`fix: yaml indent`
`fix: yaml indent again`
`chore: rewrite entire yaml because I gave up`

Tôi không phải là kỹ sư phần mềm. Tôi là kỹ sư nâng niu khoảng trắng.

### 2. Sự an toàn mang tên Terminal

Dù có vò đầu bứt tai chửi rủa những khoảng trắng kia bao nhiêu lần, thì sâu thẳm bên trong, tôi — và hiều đồng nghiệp khác — lại nghiện YAML, nghiện việc thu mình vào terminal. 

Vì sao? Vì nó an toàn. 

Thế giới của syntax có nhân quả rõ ràng. Đầu vào đúng thì đầu ra xanh. Lỗi thì có call stack để dò. Mọi thứ đều có thể kiểm soát.
Chúng ta trốn vào những file config, đắm chìm trong việc tối ưu pipeline, xây dựng những hệ thống kết nối hàng triệu user. Nhưng đến khi ấn nút tắt laptop, quạt tản nhiệt ngừng quay, ánh sáng duy nhất trong phòng chìm xuống... ta chợt nhận ra mình đang lơ lửng, lạc lõng, và chẳng kết nối được với ai cả.

Chữa một bug hệ thống mất 2 tiếng. Nhưng làm sao để rollback lại một ngày u ám? 
Làm sao để thêm một block `try-catch` cho những dồn nén đang vỡ vụn trong lồng ngực?
Máy móc có logs để trace. Còn con người, khi hỏng hóc từ bên trong, lại chẳng in ra màn hình dòng báo lỗi nào.

### 3. Plot Twist: Khởi tạo một dòng Markdown

Rồi một ngày, tôi mở VS Code. Không phải để sửa file Ansible hay Kubernetes config.
Tôi tạo một file `.md`.

Lần đầu tiên sau rất lâu, tôi viết một thứ không bị crash nếu đánh sai một dấu cách.
Không check cú pháp. Không compile. Không resource limit.
Markdown tước đi mọi lớp vỏ bọc bảo vệ của lô-gíc, chỉ để lại những con chữ phơi bày trần trụi.

Tôi chuyển từ YAML sang Markdown không phải vì tôi đổi nghề. Mà vì tôi nhận ra chiếc áo "engineer lạnh lùng, chỉ nói chuyện bằng data" đã quá chật để giấu đi những hỗn độn xốn xang bên trong mình. 
Viết config là ra lệnh cho máy móc để chúng vận hành thế giới. Còn viết Markdown, đôi khi chỉ là tiếng thở dài thật khẽ của một con người đang cặm cụi tự sửa chữa lại chính tâm hồn mình.