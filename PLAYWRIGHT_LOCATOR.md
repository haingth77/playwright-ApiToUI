### 1. getByRole:

Dưới đây là danh sách các role ARIA được hỗ trợ bởi `getByRole()` trong Playwright (dựa trên ARIA specification và các role phổ biến trong testing). Tôi sắp xếp theo độ phổ biến giảm dần (ước lượng dựa trên việc sử dụng trong các ứng dụng web thực tế, như button và link xuất hiện nhiều nhất). Cột "Tag HTML" chỉ ra thẻ implicit (mặc định) nếu có; nếu không, role thường được sử dụng explicit (thêm `role="..."` vào thẻ khác như `<div>`).

| Độ phổ biến | Role        | Mô tả ngắn gọn                   | Tag HTML (Implicit)                 |
| ----------- | ----------- | -------------------------------- | ----------------------------------- |
| 1           | button      | Nút nhấn (clickable)             | `<button>`, `<input type="button">` |
| 2           | link        | Liên kết (navigable)             | `<a>`                               |
| 3           | textbox     | Ô nhập văn bản                   | `<input>`, `<textarea>`             |
| 4           | checkbox    | Hộp kiểm (on/off)                | `<input type="checkbox">`           |
| 5           | heading     | Tiêu đề (h1-h6)                  | `<h1>`-`<h6>`                       |
| 6           | img         | Hình ảnh                         | `<img>`                             |
| 7           | radio       | Nút radio (chọn một trong nhóm)  | `<input type="radio">`              |
| 8           | listbox     | Danh sách chọn (dropdown/select) | `<select>`, `<ul>` (explicit)       |
| 9           | option      | Tùy chọn trong listbox/combobox  | `<option>`, `<li>` (explicit)       |
| 10          | combobox    | Hộp kết hợp (editable dropdown)  | `<input>` + `<datalist>` (explicit) |
| 11          | list        | Danh sách                        | `<ul>`, `<ol>`                      |
| 12          | listitem    | Mục trong danh sách              | `<li>`                              |
| 13          | table       | Bảng                             | `<table>`                           |
| 14          | row         | Hàng trong bảng                  | `<tr>`                              |
| 15          | cell        | Ô trong bảng                     | `<td>`, `<th>`                      |
| 16          | dialog      | Hộp thoại (modal)                | `<dialog>` (explicit)               |
| 17          | alert       | Thông báo lỗi/cảnh báo           | `<div>` (explicit)                  |
| 18          | menu        | Menu điều hướng                  | `<nav>` (explicit)                  |
| 19          | menuitem    | Mục trong menu                   | `<a>` (explicit)                    |
| 20          | tab         | Tab trong tablist                | `<button>` (explicit)               |
| 21          | tabpanel    | Nội dung tab                     | `<div>` (explicit)                  |
| 22          | progressbar | Thanh tiến trình                 | `<progress>`                        |
| 23          | slider      | Thanh trượt (range input)        | `<input type="range">`              |
| 24          | spinbutton  | Nút xoay số                      | `<input type="number">`             |
| 25          | separator   | Dấu phân cách                    | `<hr>` (explicit)                   |

**Lưu ý**:

- Danh sách này không đầy đủ (ARIA có ~70 role), chỉ bao gồm các role phổ biến nhất trong Playwright testing. Bạn có thể kiểm tra đầy đủ tại [ARIA Roles](https://www.w3.org/TR/wai-aria-1.1/#roles).
- Độ phổ biến là ước lượng; trong dự án của bạn, có thể khác nhau.
- Nếu role không có tag implicit, nó thường được thêm explicit vào thẻ như `<div role="button">`.
- Để sử dụng: `page.getByRole('button', { name: 'Submit' })`. Nếu cần, thêm `exact: true` hoặc filter.

### 2. getByText:

Tìm phần tử dựa trên văn bản hiển thị (visible text) trên trang. Phù hợp cho các phần tử không có role rõ ràng nhưng có text.

- **Ví dụ**: `page.getByText('Submit')` – Tìm phần tử chứa text "Submit".
- **Lưu ý**: Có thể thêm `exact: true` để khớp chính xác, hoặc filter như `hasText()`.

### 3. getByLabel:

Tìm phần tử form dựa trên text của label liên kết (thông qua `<label>` hoặc `aria-labelledby`).

- **Ví dụ**: `page.getByLabel('Username')` – Tìm input có label "Username".
- **Lưu ý**: Phù hợp cho accessibility, tự động liên kết với input.

### 4. getByPlaceholder:

Tìm phần tử input dựa trên placeholder text.

- **Ví dụ**: `page.getByPlaceholder('Enter your name')` – Tìm input có placeholder "Enter your name".
- **Lưu ý**: Chỉ áp dụng cho `<input>` hoặc `<textarea>` có `placeholder` attribute.

### 5. getByAltText:

Tìm phần tử hình ảnh dựa trên alt text (cho accessibility).

- **Ví dụ**: `page.getByAltText('Company Logo')` – Tìm `<img alt="Company Logo">`.
- **Lưu ý**: Phù hợp cho `<img>`, `<area>`, hoặc elements với `aria-label`.

### 6. getByTitle:

Tìm phần tử dựa trên title attribute (tooltip text).

- **Ví dụ**: `page.getByTitle('Close')` – Tìm element có `title="Close"`.
- **Lưu ý**: Ít phổ biến, nhưng hữu ích cho tooltips.

### 7. getByTestId:

Tìm phần tử dựa trên custom data attribute, thường là `data-testid` (khuyến nghị cho testing).

- **Ví dụ**: `page.getByTestId('submit-button')` – Tìm element có `data-testid="submit-button"`.
- **Lưu ý**: Cần thêm attribute vào HTML; không phụ thuộc vào UI changes.
