Nội dung chúng ta soạn \*\*đã đủ nền tảng cho Phase 0\*\*. Hiện tại chỉ cần chỉnh lại cách trình bày cho rõ ràng, chuyên nghiệp hơn và thống nhất thuật ngữ. Dưới đây là bản đã được biên tập lại để chúng ta có thể đưa vào file `PHASE\_0\_PROJECT\_OVERVIEW.md`.



\---



\# Smart Cookbook AI



\## 1. Mô tả dự án



\*\*Smart Cookbook AI\*\* là một ứng dụng điện thoại hỗ trợ người dùng nấu ăn bằng AI. Người dùng có thể chụp một hoặc nhiều ảnh nguyên liệu hoặc món ăn hiện có. Sau đó, hệ thống AI sẽ nhận diện các thành phần trong ảnh, chuẩn hóa danh sách nguyên liệu và đề xuất những món ăn có thể nấu được dựa trên nguyên liệu người dùng đang có.



Sau khi người dùng chọn một món ăn, ứng dụng sẽ chuyển sang chế độ \*\*AI Cooking Assistant\*\*. Ở chế độ này, AI sẽ hướng dẫn người dùng nấu ăn từng bước theo thời gian thực. Trong quá trình nấu, người dùng có thể hỏi AI các câu hỏi như:



```text

Không có hành lá thì thay bằng gì?

Nên để lửa lớn hay lửa nhỏ?

Món này nấu trong bao lâu?

Tôi muốn món này ít dầu hơn thì làm sao?

```



Mục tiêu của dự án là giúp người dùng tận dụng nguyên liệu sẵn có, giảm thời gian suy nghĩ “hôm nay ăn gì”, đồng thời hỗ trợ người mới nấu ăn có thể làm theo hướng dẫn dễ dàng hơn.



\---



\## 2. Trải nghiệm người dùng chính



```text

Chụp ảnh

→ AI nhận diện nguyên liệu

→ Người dùng xác nhận hoặc chỉnh sửa

→ Chọn nhu cầu ăn uống và độ khó

→ AI đề xuất món ăn

→ Xem chi tiết món

→ AI hướng dẫn nấu từng bước

```



\---



\## 3. Đối tượng người dùng



\### 3.1. Người dùng thông thường



Là người sử dụng ứng dụng để chụp ảnh nguyên liệu, tìm món ăn phù hợp và nhận hướng dẫn nấu ăn.



Nhóm người dùng phù hợp:



```text

Sinh viên

Người sống một mình

Người mới học nấu ăn

Người muốn ăn uống tiết kiệm

Người muốn nấu nhanh tại nhà

Người muốn ăn theo mục tiêu: ăn kiêng, tăng cơ, giảm mỡ

```



\### 3.2. Admin



Là người quản lý dữ liệu hệ thống và đảm bảo nội dung món ăn trong ứng dụng luôn chính xác.



Admin có thể:



```text

Quản lý danh sách món ăn

Quản lý nguyên liệu

Quản lý công thức nấu ăn

Quản lý danh mục chế độ ăn

Kiểm tra dữ liệu AI trả về

Cập nhật hoặc chỉnh sửa recipe database

```



\---



\## 4. Flow chính của hệ thống



\### Chức năng chính: Pics2Recipe



\*\*Pics2Recipe\*\* là chức năng cho phép người dùng chụp ảnh nguyên liệu hoặc món ăn, sau đó hệ thống AI sẽ phân tích ảnh và đề xuất danh sách món ăn có thể nấu.



Các bước xử lý:



\### Bước 1: Chụp ảnh



Người dùng chụp một hoặc nhiều ảnh nguyên liệu/món ăn bằng điện thoại.



\### Bước 2: Gửi ảnh lên backend



Hệ thống gửi ảnh lên backend để AI xử lý và phân tích.



\### Bước 3: AI nhận diện ảnh



\*\*Vision AI\*\* nhận diện nguyên liệu hoặc món ăn có trong ảnh.



Ví dụ:



```text

Trứng gà

Cà chua

Hành lá

Thịt băm

Tỏi

```



\### Bước 4: Hiển thị danh sách nguyên liệu



Hệ thống hiển thị danh sách nguyên liệu mà AI đã nhận diện được.



\### Bước 5: Người dùng xác nhận hoặc chỉnh sửa



Người dùng có thể kiểm tra lại danh sách nguyên liệu và chỉnh sửa nếu cần.



Các thao tác gồm:



```text

Thêm nguyên liệu

Xóa nguyên liệu

Sửa tên nguyên liệu

Điền số lượng

Điền khối lượng nếu có

```



\### Bước 6: Chọn nhu cầu ăn uống



Người dùng chọn mục tiêu hoặc phong cách ăn uống mong muốn.



Ví dụ:



```text

Ăn bình thường

Ăn kiêng

Tăng cơ

Giảm mỡ

Ăn healthy

Món tiết kiệm

Món dưới 30 phút

```



\### Bước 7: Chọn độ khó



Người dùng chọn độ khó mong muốn cho món ăn.



Ví dụ:



```text

Dễ

Vừa

Khó

```



\### Bước 8: AI đề xuất món ăn



\*\*Recipe Recommendation AI\*\* phân tích danh sách nguyên liệu, nhu cầu ăn uống và độ khó để đề xuất các món ăn phù hợp.



\### Bước 9: Sắp xếp danh sách món ăn



Danh sách món ăn được sắp xếp theo độ phù hợp.



Tiêu chí ưu tiên:



```text

Món dùng nhiều nguyên liệu người dùng đang có

Món thiếu ít nguyên liệu nhất

Món phù hợp với nhu cầu ăn uống

Món phù hợp với độ khó đã chọn

Món có thời gian nấu phù hợp

```



\### Bước 10: Xem chi tiết món ăn



Người dùng chọn một món để xem chi tiết.



Thông tin hiển thị gồm:



```text

Tên món

Nguyên liệu đã có

Nguyên liệu còn thiếu

Thời gian nấu

Độ khó

Các bước nấu cơ bản

```



\### Bước 11: Bắt đầu nấu



Người dùng chọn nút \*\*“Bắt đầu nấu”\*\* để chuyển sang chế độ hướng dẫn nấu ăn.



\### Bước 12: AI hướng dẫn nấu ăn



\*\*AI Cooking Assistant\*\* hướng dẫn người dùng nấu ăn từng bước theo thời gian thực.



Người dùng có thể đặt câu hỏi trong quá trình nấu và AI sẽ trả lời dựa trên món ăn hiện tại, bước nấu hiện tại và nguyên liệu người dùng đang có.



\---



\## 5. Danh sách chức năng cơ bản



\## 5.1. Chức năng của User



```text

Đăng ký / đăng nhập

Chụp ảnh nguyên liệu hoặc món ăn

Upload một hoặc nhiều ảnh

AI nhận diện nguyên liệu trong ảnh

Xác nhận hoặc chỉnh sửa nguyên liệu

Chọn mục tiêu ăn uống

Chọn độ khó nấu ăn

Nhận danh sách món ăn đề xuất

Xem chi tiết món ăn

Bắt đầu phiên hướng dẫn nấu ăn

Chat với AI trong lúc nấu

Lưu món yêu thích

Xem lịch sử món đã nấu

```



\---



\## 5.2. Chức năng của Admin



```text

Quản lý món ăn

Quản lý nguyên liệu

Quản lý công thức nấu ăn

Quản lý danh mục chế độ ăn

Quản lý độ khó món ăn

Kiểm tra dữ liệu món ăn

Cập nhật recipe database

```



\---



\# 6. Multi-AI trong hệ thống



Dự án sử dụng kiến trúc \*\*Multi-AI\*\*, trong đó mỗi AI đảm nhận một nhiệm vụ riêng trong toàn bộ quy trình xử lý.



```text

Ảnh người dùng

→ AI nhận diện món ăn/nguyên liệu

→ AI chuẩn hóa dữ liệu nguyên liệu

→ AI đề xuất món ăn

→ AI hướng dẫn nấu ăn

```



\---



\## 6.1. AI nhận diện món ăn/nguyên liệu



\*\*Tên đề xuất:\*\* Vision AI Agent



\*\*Nhiệm vụ:\*\* phân tích ảnh người dùng chụp và nhận diện các nguyên liệu hoặc món ăn có trong ảnh.



Input:



```text

Một hoặc nhiều ảnh nguyên liệu/món ăn

```



Output:



```text

Danh sách nguyên liệu/món ăn được nhận diện

Độ tin cậy của từng kết quả

Số lượng hoặc khối lượng ước lượng nếu có

```



Ví dụ:



```json

{

&#x20; "detected\_items": \[

&#x20;   {

&#x20;     "name": "trứng gà",

&#x20;     "quantity": "3 quả",

&#x20;     "confidence": 0.92

&#x20;   },

&#x20;   {

&#x20;     "name": "cà chua",

&#x20;     "quantity": "2 quả",

&#x20;     "confidence": 0.88

&#x20;   }

&#x20; ]

}

```



\---



\## 6.2. AI chuẩn hóa nội dung món ăn/nguyên liệu



\*\*Tên đề xuất:\*\* Ingredient Normalizer Agent



\*\*Nhiệm vụ:\*\* chuẩn hóa dữ liệu nguyên liệu do AI nhận diện trả về để hệ thống dễ lưu trữ và tìm kiếm.



Ví dụ chuẩn hóa:



```text

egg / eggs / chicken egg / trứng → trứng gà

tomato / cà chua đỏ / cà chua → cà chua

green onion / scallion / hành → hành lá

```



Agent này giúp tránh lỗi dữ liệu không đồng nhất trong database.



\---



\## 6.3. AI đề xuất món ăn



\*\*Tên đề xuất:\*\* Recipe Recommendation Agent



\*\*Nhiệm vụ:\*\* đề xuất danh sách món ăn phù hợp dựa trên:



```text

Nguyên liệu người dùng đang có

Nguyên liệu còn thiếu

Nhu cầu ăn uống

Độ khó mong muốn

Thời gian nấu

Lịch sử hoặc sở thích người dùng nếu có

```



Output mong muốn:



```json

{

&#x20; "recommended\_recipes": \[

&#x20;   {

&#x20;     "name": "Trứng xào cà chua",

&#x20;     "match\_score": 0.95,

&#x20;     "available\_ingredients": \["trứng gà", "cà chua", "hành lá"],

&#x20;     "missing\_ingredients": \["nước mắm"],

&#x20;     "cooking\_time": "15 phút",

&#x20;     "difficulty": "Dễ"

&#x20;   }

&#x20; ]

}

```



\---



\## 6.4. AI hướng dẫn nấu ăn



\*\*Tên đề xuất:\*\* Cooking Assistant Agent



\*\*Nhiệm vụ:\*\* hướng dẫn người dùng nấu ăn từng bước theo thời gian thực.



Agent này cần biết:



```text

Người dùng đang nấu món gì

Người dùng đang ở bước số mấy

Nguyên liệu nào đã có

Nguyên liệu nào còn thiếu

Người dùng chọn mục tiêu ăn uống nào

Người dùng muốn độ khó nào

```



Ví dụ hội thoại:



```text

AI: Bước 1: Rửa sạch cà chua và cắt múi cau.



User: Tôi không có hành lá thì thay bằng gì?



AI: Chúng ta có thể bỏ hành lá nếu không có. Nếu muốn món thơm hơn, có thể thay bằng một ít ngò rí hoặc hành tím phi.

```



\---



\# 7. Phạm vi MVP ban đầu



Ở phiên bản đầu tiên, dự án nên tập trung vào những chức năng cốt lõi.



\## MVP cần có



```text

Chụp hoặc upload ảnh nguyên liệu

AI nhận diện nguyên liệu trong ảnh

Người dùng xác nhận/chỉnh sửa danh sách nguyên liệu

Người dùng chọn nhu cầu ăn uống và độ khó

Hệ thống đề xuất món ăn phù hợp

Người dùng xem chi tiết món ăn

AI hướng dẫn nấu từng bước

```



\## Chưa cần làm ở MVP đầu tiên



```text

Voice assistant

Meal planning theo tuần

Tính calories chi tiết

Shopping list tự động

Chia sẻ món ăn lên cộng đồng

Gợi ý món theo lịch sử dài hạn

Thanh toán hoặc premium plan

```



\---



\# 8. Các điểm cần sửa trong bản hiện tại của chúng ta



Bản hiện tại khá tốt. Chúng ta chỉ cần chỉnh vài điểm nhỏ:



| Chỗ hiện tại                   | Nên sửa thành                     |

| ------------------------------ | --------------------------------- |

| `Đối tượng người dung`         | `Đối tượng người dùng`            |

| `AI CHUẨN HOÁ NỘI DUNG MÓN ĂN` | `AI chuẩn hóa nguyên liệu/món ăn` |

| `AI NHẬN DIỆN MÓN ĂN`          | `AI nhận diện món ăn/nguyên liệu` |

| `MULTI\_AI`                     | `Multi-AI trong hệ thống`         |

| `Upload 1 hoặc nhiều ảnh`      | `Upload một hoặc nhiều ảnh`       |



\---



\# 9. Định nghĩa thuật ngữ chính



\*\*Pics2Recipe:\*\* chức năng chuyển từ ảnh nguyên liệu/món ăn thành danh sách món ăn có thể nấu.



\*\*Vision AI:\*\* AI dùng để phân tích hình ảnh và nhận diện món ăn hoặc nguyên liệu.



\*\*Ingredient Normalizer:\*\* thành phần xử lý dùng để chuẩn hóa tên nguyên liệu về một dạng thống nhất.



\*\*Recipe Recommendation AI:\*\* AI đề xuất món ăn phù hợp dựa trên nguyên liệu và nhu cầu của người dùng.



\*\*AI Cooking Assistant:\*\* trợ lý AI hướng dẫn nấu ăn từng bước theo thời gian thực.



\*\*Multi-AI:\*\* mô hình dùng nhiều AI/agent khác nhau, mỗi AI đảm nhận một nhiệm vụ riêng.



\*\*MVP:\*\* phiên bản đầu tiên tối giản nhưng có thể chạy được và thể hiện được chức năng chính của sản phẩm.

