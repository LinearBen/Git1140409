const apiUrlProducts = 'http://localhost:8000/api/products';
const apiUrlPurchase = 'http://localhost:8000/api/purchaserecord';
const apiUrlPass = 'http://localhost:8000/api/passagerecord'
const apiUrlMaintenancerecord = 'http://localhost:8000/api/maintenancerecord'
const apiUrltickets_total = 'http://localhost:8000/api/tickets_total'
const apiUrlDeviveRecord = 'http://localhost:8000/api/devicerecord'
const apiUrlVendorRecord = 'http://localhost:8000/api/vendorRecord'

async function updateTable(url, todiv) {
    try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`HTTP 錯誤: ${resp.status}`);
        const data = await resp.json();
        if (!Array.isArray(data) || data.length === 0) {
            todiv.textContent = '沒有資料';
            return;
        }
        // 產生表格
        let table = '<table><thead><tr>';
        // 自動產出表頭
        const keys = Object.keys(data[0]);
        keys.forEach(k => {
            table +=`<th>操作</th>`;
            table += `<th>${k}</th>`;
        });
        table += '</tr></thead><tbody>';
        // 每一列資料
        data.forEach(row => {
            table += '<tr>';
            let rtn = '';
            keys.forEach(k => {
                table += `<td>><button onclick="">刪除</button></td>`;
                table += `<td>${row[k]}</td>`;
                if(k!='state'){
                rtn = rtn + k + ':' + row[k] + ',';
                }
            });
            rtn += "state:-1}";
            table += '</tr>';
        });
        table += '</tbody></table>';
        todiv.innerHTML = table;
    } catch (err) {
        todiv.textContent = '載入失敗：' + err.message;
    }
}