# AI và nỗi lo của người viết code

Có một thời, nỗi sợ lớn nhất của kỹ sư phần mềm là production down lúc 2 giờ sáng.
Bây giờ, nỗi sợ đó có thêm một người bạn mới:
bị thay thế bởi chính công cụ mình đang dùng mỗi ngày.

### 1. Khi copilot viết code nhanh hơn bạn

Tôi nhớ lần đầu dùng AI code assistant.
Gõ được một dòng comment, nó đã suggest cả function.
Đúng logic. Đúng convention. Thậm chí đặt tên biến còn dễ đọc hơn tôi.

Cảm giác đầu tiên: tiện thật.
Cảm giác thứ hai: hơi… bất an.

Giống như bạn đang pair programming với một người không bao giờ mệt,
không bao giờ cần coffee break,
và không bao giờ hỏi lại "tại sao mình làm cái này?"

### 2. Câu hỏi ai cũng nghĩ nhưng ít ai nói

"AI có thay thế software engineer không?"

Câu hỏi này xuất hiện ở mọi nơi:
Tech Twitter, Reddit, group chat công ty, và cả trong đầu bạn lúc 11 giờ đêm.

Nhưng tôi nghĩ câu hỏi đúng hơn nên là:
"Phần nào trong công việc của mình sẽ bị thay thế?"

Viết boilerplate code? Chắc rồi.
Generate CRUD API? Đã xong từ lâu.
Convert design sang HTML/CSS? Gần như automated.

Nhưng debug một hệ thống distributed lúc 3 giờ sáng khi log không đủ,
khi metric nói một đằng, trace nói một nẻo,
khi phải quyết định rollback hay hotfix trong 5 phút —
AI chưa ngồi vào ghế đó được.

### 3. Paradox: dùng AI để lo về AI

Điều buồn cười nhất là:
tôi dùng AI để research về việc AI thay thế engineer.
Tôi hỏi ChatGPT: "AI có thay thế software engineer không?"
Nó trả lời rất diplomatic: "AI sẽ augment, không replace."

Tôi không biết nên tin hay nên lo.
Giống như hỏi một con robot: "Mày có nguy hiểm không?"
Câu trả lời luôn là: "Không đâu, tin tôi đi." 😄

### 4. Những thứ AI (chưa) làm được

AI rất giỏi pattern matching.
Nhưng engineering không chỉ là pattern.

Nó là:
- Hiểu vì sao business cần feature này trước feature kia.
- Biết khi nào nên nói "không" với một technical approach.
- Cảm nhận được team đang burnout dù standup vẫn "mọi thứ ổn".
- Quyết định trade-off giữa "làm đúng" và "làm kịp".
- Đọc một PR và hiểu người viết đang thiếu context, không phải thiếu skill.

Đây không phải là code.
Đây là judgment.
Và judgment thì không có training data.

### 5. Nhưng nỗi lo vẫn là thật

Tôi không phủ nhận:
có những công việc sẽ biến mất.

Junior developer chỉ biết copy-paste từ StackOverflow?
Vị trí đó đã khó hơn rồi.

"Coder" chỉ biết implement mà không hiểu why?
AI làm phần đó nhanh hơn, rẻ hơn.

Thị trường đang dịch chuyển.
Không phải engineer bị thay thế,
mà là **thanh chắn để trở thành một engineer tốt** đang được nâng lên.

Bạn không chỉ cần biết code.
Bạn cần biết design system.
Bạn cần hiểu infrastructure.
Bạn cần có khả năng communicate.
Bạn cần biết khi nào nên dùng AI, và khi nào nên tự nghĩ.

### 6. Adapt hay bị adapt

Tôi nghĩ về những nghề đã thay đổi vì technology:

Thợ sắp chữ in → desktop publishing.
Tổng đài viên → IVR system.
Thợ rửa phim → digital camera.

Không ai trong số họ biến mất hoàn toàn.
Nhưng những ai không adapt thì có.

Software engineering cũng vậy.
AI không giết nghề này.
Nhưng nó sẽ giết cách làm cũ.

Người viết code bằng tay từng dòng sẽ ít đi.
Người orchestrate, review, và architect sẽ nhiều lên.
Người hiểu "cái gì cần build" sẽ có giá trị hơn người chỉ biết "build như thế nào".

### 7. Cảm giác của một kỹ sư giữa thời AI

Thật lòng mà nói:
tôi vẫn lo.

Không phải lo mất việc ngày mai.
Mà lo rằng 5 năm nữa, skillset hiện tại có còn đủ không.
Lo rằng mình đang học những thứ sẽ sớm bị deprecated — không phải bởi framework mới,
mà bởi AI làm tốt hơn.

Nhưng rồi tôi nhớ lại:
10 năm trước, người ta cũng lo cloud sẽ giết sysadmin.
Kết quả? Sysadmin không chết.
Họ trở thành DevOps, SRE, Platform Engineer.

Nghề không biến mất.
Nó evolve.
Và người sống sót là người evolve cùng nó.

### 8. Thay lời kết

Tôi không biết AI sẽ đưa nghề này đi đến đâu.
Không ai biết.

Nhưng tôi biết một điều:
Nếu bạn đang đọc bài này và cảm thấy lo lắng,
thì ít nhất bạn đang quan tâm đủ để suy nghĩ về nó.

Và đó đã là bước đầu tiên rồi.

Giống như mọi hệ thống:
không sợ failure,
sợ không có monitoring.

Lo lắng về AI không phải là yếu đuối.
Nó là một dạng **self-monitoring**.
Và một engineer biết monitor chính mình,
thường sẽ ổn thôi.
