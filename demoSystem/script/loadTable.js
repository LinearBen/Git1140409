const apiUrlProducts = 'http://localhost:8000/api/products';
const apiUrlPurchase = 'http://localhost:8000/api/purchaserecord';
const apiUrlPass = 'http://localhost:8000/api/passagerecord'
const apiUrlMaintenancerecord = 'http://localhost:8000/api/maintenancerecord'
const apiUrltickets_total = 'http://localhost:8000/api/tickets_total'
const apiUrlDeviveRecord = 'http://localhost:8000/api/devicerecord'
const apiUrlVendorRecord = 'http://localhost:8000/api/vendorRecord'


//1. 讀取資料fetch        固定url -> 不固定
//2. 產生table html  (jsondata+table混合產生)
//3. 顯示table到指定div   固定element -> 不固定
async function loadTable(url, todiv) {
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
            table += `<th>${k}</th>`;
        });
        table += '</tr></thead><tbody>';
        // 每一列資料
        data.forEach(row => {
            table += '<tr>';
            keys.forEach(k => {
                table += `<td>${row[k]}</td>`;
            });
            table += '</tr>';
        });
        table += '</tbody></table>';
        todiv.innerHTML = table;
    } catch (err) {
        todiv.textContent = '載入失敗：' + err.message;
    }
}
async function selectAdd(opID, apiUrl) {
    const opname = document.getElementById(opID);
     // 清空選項（保留第一個 -- 選項）
    const firstOption = opname.options[0];
    opname.innerHTML = '';
    if (firstOption) {
        opname.appendChild(firstOption);
    }
    try {
        const resp = await fetch(apiUrl);
        if (!resp.ok) throw new Error(`HTTP 錯誤: ${resp.status}`);
        const data = await resp.json();
        if (!Array.isArray(data) || data.length === 0) {
            container.textContent = '沒有資料';
            return;
        }
        // 每一列資料
        data.forEach(row => {
            switch (opID) {
                case "pname":
                    const { TicketID, TicketName } = row;

                    let op = document.createElement("option");
                    op.value = TicketID;
                    op.textContent = TicketName;
                    opname.append(op)
                    break;
                case "dname":
                    const { Device_ID, Device_Name } = row;

                    let op1 = document.createElement("option");
                    op1.value = Device_ID;
                    op1.textContent = Device_ID + Device_Name;
                    opname.append(op1)
                    break;
                case "vname":
                    const { Vendor_ID, Vendor_Name, Contact_Person } = row;

                    let op2 = document.createElement("option");
                    op2.value = Vendor_ID;
                    op2.textContent = Vendor_Name + "(" + Contact_Person + ")";
                    opname.append(op2)
                    break;


            }
        });
    } catch (err) {
    }
}