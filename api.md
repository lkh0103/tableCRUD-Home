# Gợi ý cấu trúc dữ liệu trả về của API

Rules chung:
- Tuân thủ RESTFUL
- Tuân thủ camelCase
- Tuân thủ chung định dạng trả về.

## Dữ liệu thành công

### CREATE:
```text
Header: POST /entry
Body: json của đối tượng
```
Reply: 201
```json
{
  "id": "123456789",
  "message": "New entry has been created!"
}
```
### READ - Lấy thông tin một đối tượng:
```text
Header: GET /entry/123456789

```
Reply: 200
```json
{
  "id": "123456789",
  "name": "abcd"
}
```
### LIST - Lấy danh sách đối tượng:
```text
Header: GET /entry

```
Reply: 200
```json
{
    "rows": [
        {
            "id": "123456789",
            "name": "abcd"
        }
    ],
    "page": 1,
    "limit": 1,
    "total": 5,
    "totalPages": 5
}
```
### UPDATE - Cập nhật đối tượng

```text
Header: PUT /entry/123456789
Body: json của đối tượng
```
Reply: 200
```json
{
  "id": "123456789",
  "message": "An entry has been updated!"
}
```

### DELETE - Xóa đối tượng
```text
Header: DELETE /entry/123456789

```
Reply: 200
```json
{
  "id": "123456789",
  "message": "An entry has been removed!"
}
```

## Dữ liệu lỗi
Tấc cả các gói tin trả về có status code >= 400 đều là lỗi. Và gói tin lỗi 
phải có chung định dạng như sau:

```json
{
  "error": {
    "message": "The error message",
    "code": "The code for error, used for helps if existed. Such as: 9999",
    "type": "The type of error if existed. Such as: ValidateException",
    "details": []
  }
}
```

**Details**: được dùng để mô tả nội dung chi tiết của lỗi, nếu có tồn tại.

Trong các trường của `error`, chỉ có trường message là bắt buộc.

## Lưu ý về lỗi: 5xx
Các api thường sẽ được 1 web server truyền đến server api để xử lý, 
nếu server api bị lỗi (thường là những lỗi ko được catch) trả về 500 theo định dạng 
đã mô tả ở trên. Tuy nhiên nếu web server bị lỗi không thể kết nối đến 
server api thì cũng sẽ trả về lỗi 5xx, trong trường hợp này dữ liệu trả về ko theo định dạng trên mà là text. Vì thế hàm fetch cần phải xử lý trường
hợp lỗi này.

