// // Wait for DOM to load
// document.addEventListener('DOMContentLoaded', () => {
//   // Initialize data from localStorage
//   let monthlyCategories = JSON.parse(localStorage.getItem('monthlyCategories')) || [];
//   let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
//   let categoryIdCounter = parseInt(localStorage.getItem('categoryIdCounter')) || 1;
//   let transactionIdCounter = parseInt(localStorage.getItem('transactionIdCounter')) || 1;

//   // DOM elements
//   const monthlyBudget_btn = document.getElementById('monthlyBudget-button');
//   const monthlyBudget_input = document.getElementById('monthlyBudget-input');
//   const arrowAccount = document.getElementById('arrowAccount');
//   const logout = document.getElementById('logout');
//   const btnShow = document.getElementById('btnShow');
//   const btnHide = document.getElementById('btnHide');
//   const chooseMonth_input = document.getElementById('chooseMonth-input');
//   const logoutNotification = document.getElementById('logoutNotification');
//   const btnlogout_yes = document.getElementById('btnlogout_yes');
//   const btnlogout_no = document.getElementById('btnlogout_no');
//   const monthlyCategoryManagement_CategoryName = document.getElementById('monthlyCategoryManagement-CategoryName');
//   const monthlyCategoryManagement_LimitMoney = document.getElementById('monthlyCategoryManagement-LimitMoney');
//   const btn_addCategory = document.getElementById('btn-addCategory');
//   const spending_addBtn = document.getElementById('spending-addBtn');
//   const monthlyCategoryManagement_Lists = document.getElementById('monthlyCategoryManagement-Lists');
//   const spending_numberMoney = document.getElementById('spending-numberMoney');
//   const spending_note = document.getElementById('spending-note');
//   const remainingAmount_number = document.getElementById('remainingAmount-number');
//   const editNotice = document.getElementById('editNotice');
//   const editSuccess = document.getElementById('editSuccess');
//   const editExitSuccess = document.getElementById('editExitSuccess');
//   const textEdit = document.getElementById('textEdit');
//   const numberEdit = document.getElementById('numberEdit');
//   const transactionHistory_list = document.getElementById('transactionHistory_list');
//   const deleteNotification = document.getElementById('deleteNotification');
//   const btnDlt_yes = document.getElementById('btnDlt_yes');
//   const btnDlt_no = document.getElementById('btnDlt_no');
//   const deleteTransaction = document.getElementById('deleteTransaction');
//   const btnDltTran_yes = document.getElementById('btnDltTran_yes');
//   const btnDltTran_no = document.getElementById('btnDltTran_no');

//   // Initial display
//   displayMonthlyCategoryManagement();
//   displayTransactionHistory();
//   updateRemainingAmount();

//   // Logout toggle
//   arrowAccount.addEventListener('click', () => {
//       const isVisible = logout.style.display === 'block';
//       logout.style.display = isVisible ? 'none' : 'block';
//       btnShow.style.display = isVisible ? 'block' : 'none';
//       btnHide.style.display = isVisible ? 'none' : 'block';
//   });

//   // Logout confirmation
//   logout.addEventListener('click', () => {
//       logoutNotification.style.display = 'block';
//   });

//   btnlogout_yes.addEventListener('click', () => {
//       window.location.href = 'http://127.0.0.1:5500/STRUCTURE_FINANCE/pages/login.html';
//   });

//   btnlogout_no.addEventListener('click', () => {
//       logoutNotification.style.display = 'none';
//   });

//   // Save monthly budget
//   monthlyBudget_btn.addEventListener('click', () => {
//       if (!monthlyBudget_input.value || !chooseMonth_input.value) {
//           alert('Vui lòng nhập đầy đủ tháng và ngân sách.');
//           return;
//       }
//       if (monthlyBudget_input.value <= 0) {
//           alert('Ngân sách phải là số dương.');
//           return;
//       }
//       addOrUpdateBudget();
//       updateRemainingAmount();
//   });

//   // Add category
//   btn_addCategory.addEventListener('click', () => {
//       if (!monthlyCategoryManagement_CategoryName.value.trim() || !monthlyCategoryManagement_LimitMoney.value) {
//           alert('Vui lòng nhập đầy đủ tên danh mục và giới hạn.');
//           return;
//       }
//       if (monthlyCategoryManagement_LimitMoney.value <= 0) {
//           alert('Giới hạn phải là số dương.');
//           return;
//       }
//       addCategory();
//       monthlyCategoryManagement_CategoryName.value = '';
//       monthlyCategoryManagement_LimitMoney.value = '';
//       displayMonthlyCategoryManagement();
//   });

//   // Add transaction
//   spending_addBtn.addEventListener('click', () => {
//       if (!spending_numberMoney.value.trim() || !spending_note.value.trim() || !chooseMonth_input.value) {
//           alert('Vui lòng nhập đầy đủ số tiền, ghi chú và chọn tháng.');
//           return;
//       }
//       if (spending_numberMoney.value <= 0) {
//           alert('Số tiền phải là số dương.');
//           return;
//       }
//       addTransaction();
//       spending_numberMoney.value = '';
//       spending_note.value = '';
//       displayTransactionHistory();
//       updateRemainingAmount();
//   });

//   // Event delegation for category edit/delete
//   monthlyCategoryManagement_Lists.addEventListener('click', (e) => {
//       const target = e.target;
//       const monthIndex = parseInt(target.dataset.monthIndex);
//       const categoryId = parseFloat(target.dataset.categoryId);

//       if (target.classList.contains('monthlyCategoryManagement-List-delete')) {
//           deleteNotification.style.display = 'block';
//           btnDlt_yes.onclick = () => {
//               deleteCategory(monthIndex, categoryId);
//               deleteNotification.style.display = 'none';
//               displayMonthlyCategoryManagement();
//               displayTransactionHistory();
//               updateRemainingAmount();
//           };
//           btnDlt_no.onclick = () => {
//               deleteNotification.style.display = 'none';
//           };
//       } else if (target.classList.contains('monthlyCategoryManagement-List-edit')) {
//           editNotice.style.display = 'block';
//           const category = monthlyCategories[monthIndex].categories.find(c => c.id === categoryId);
//           textEdit.value = category.name;
//           numberEdit.value = monthlyCategories[monthIndex].budget;

//           editSuccess.onclick = () => {
//               if (!textEdit.value.trim() || !numberEdit.value) {
//                   alert('Vui lòng nhập đầy đủ tên và giới hạn.');
//                   return;
//               }
//               if (numberEdit.value <= 0) {
//                   alert('Giới hạn phải là số dương.');
//                   return;
//               }
//               editCategory(monthIndex, categoryId);
//               editNotice.style.display = 'none';
//               displayMonthlyCategoryManagement();
//           };
//           editExitSuccess.onclick = () => {
//               editNotice.style.display = 'none';
//           };
//       }
//   });

//   // Event delegation for transaction delete
//   transactionHistory_list.addEventListener('click', (e) => {
//       if (e.target.classList.contains('transactionHistory-listLine_delete')) {
//           const transactionId = parseFloat(e.target.dataset.transactionId);
//           deleteTransaction.style.display = 'block';
//           btnDltTran_yes.onclick = () => {
//               deleteTransactionById(transactionId);
//               deleteTransaction.style.display = 'none';
//               displayTransactionHistory();
//               updateRemainingAmount();
//           };
//           btnDltTran_no.onclick = () => {
//               deleteTransaction.style.display = 'none';
//           };
//       }
//   });

//   // Add or update budget
//   function addOrUpdateBudget() {
//       let existingMonth = monthlyCategories.find(el => el.month === chooseMonth_input.value);
//       if (existingMonth) {
//           existingMonth.budget = parseFloat(monthlyBudget_input.value);
//       } else {
//           monthlyCategories.push({
//               month: chooseMonth_input.value,
//               budget: parseFloat(monthlyBudget_input.value),
//               categories: [],
//           });
//       }
//       saveToLocalStorage();
//   }

//   // Add category
//   function addCategory() {
//       let existingMonth = monthlyCategories.find(el => el.month === chooseMonth_input.value);
//       const newCategory = {
//           id: categoryIdCounter++,
//           name: monthlyCategoryManagement_CategoryName.value.trim(),
//           limit: parseFloat(monthlyCategoryManagement_LimitMoney.value),
//       };

//       if (existingMonth) {
//           existingMonth.categories.push(newCategory);
//       } else {
//           monthlyCategories.push({
//               month: chooseMonth_input.value,
//               budget: parseFloat(monthlyBudget_input.value) || 0,
//               categories: [newCategory],
//           });
//       }
//       saveToLocalStorage();
//   }

//   // Add transaction
//   function addTransaction() {
//       // Assume transaction is tied to the first category of the selected month
//       const monthData = monthlyCategories.find(el => el.month === chooseMonth_input.value);
//       const categoryId = monthData?.categories[0]?.id || null;

//       if (!categoryId) {
//           alert('Vui lòng thêm danh mục cho tháng này trước.');
//           return;
//       }

//       const newTransaction = {
//           id: transactionIdCounter++,
//           date: new Date().toISOString().split('T')[0], // Use current date
//           amount: parseFloat(spending_numberMoney.value),
//           description: spending_note.value.trim(),
//           categoryId: categoryId,
//           monthCategoryId: categoryId,
//       };
//       transactions.push(newTransaction);
//       saveToLocalStorage();
//   }

//   // Delete category
//   function deleteCategory(monthIndex, categoryId) {
//       const month = monthlyCategories[monthIndex];
//       month.categories = month.categories.filter(c => c.id !== categoryId);
//       // Remove transactions tied to this category
//       transactions = transactions.filter(t => t.categoryId !== categoryId);
//       if (month.categories.length === 0) {
//           monthlyCategories.splice(monthIndex, 1);
//       }
//       saveToLocalStorage();
//   }

//   // Edit category
//   function editCategory(monthIndex, categoryId) {
//       const category = monthlyCategories[monthIndex].categories.find(c => c.id === categoryId);
//       category.name = textEdit.value.trim();
//       monthlyCategories[monthIndex].budget = parseFloat(numberEdit.value);
//       saveToLocalStorage();
//   }

//   // Delete transaction
//   function deleteTransactionById(transactionId) {
//       transactions = transactions.filter(t => t.id !== transactionId);
//       saveToLocalStorage();
//   }

//   // Display categories
//   function displayMonthlyCategoryManagement() {
//       monthlyCategoryManagement_Lists.innerHTML = '';
//       if (monthlyCategories.length === 0) {
//           monthlyCategoryManagement_Lists.innerHTML = '<div>Chưa có danh mục nào.</div>';
//           return;
//       }

//       monthlyCategories.forEach((month, monthIndex) => {
//           month.categories.forEach(category => {
//               const div = document.createElement('div');
//               div.className = 'monthlyCategoryManagement_List';
//               div.innerHTML = `
//                   <div>${category.name} - Giới hạn: <span>${category.limit.toLocaleString()} VND</span></div>
//                   <div class="monthlyCategoryManagement-List-edit-delete">
//                       <span class="monthlyCategoryManagement-List-edit" data-month-index="${monthIndex}" data-category-id="${category.id}">Sửa</span>
//                       <span class="monthlyCategoryManagement-List-delete" data-month-index="${monthIndex}" data-category-id="${category.id}">Xoá</span>
//                   </div>
//               `;
//               monthlyCategoryManagement_Lists.appendChild(div);
//           });
//       });
//   }

//   // Display transaction history
//   function displayTransactionHistory() {
//       transactionHistory_list.innerHTML = '';
//       if (transactions.length === 0) {
//           transactionHistory_list.innerHTML = '<div>Chưa có giao dịch nào.</div>';
//           return;
//       }

//       transactions.forEach(transaction => {
//           const month = monthlyCategories.find(m => m.categories.some(c => c.id === transaction.categoryId));
//           if (!month) return; // Skip orphaned transactions
//           const category = month.categories.find(c => c.id === transaction.categoryId);
//           const div = document.createElement('div');
//           div.className = 'transactionHistory-listLine';
//           div.innerHTML = `
//               <div class="transactionHistory-listLine_text">
//                   <div>${category.name}</div>-
//                   <div>${transaction.description} -- ${transaction.date}</div>:
//                   <div><span>${transaction.amount.toLocaleString()}</span> VND</div>
//               </div>
//               <div class="transactionHistory-listLine_delete" data-transaction-id="${transaction.id}">Xoá</div>
//           `;
//           transactionHistory_list.appendChild(div);
//       });
//   }

//   // Update remaining amount
//   function updateRemainingAmount() {
//       const selectedMonth = chooseMonth_input.value;
//       const monthData = monthlyCategories.find(m => m.month === selectedMonth);
//       if (!monthData) {
//           remainingAmount_number.textContent = '0 VND';
//           return;
//       }

//       const totalSpent = transactions
//           .filter(t => {
//               const transactionMonth = t.date.slice(0, 7); // YYYY-MM
//               return transactionMonth === selectedMonth;
//           })
//           .reduce((sum, t) => sum + t.amount, 0);

//       const remaining = monthData.budget - totalSpent;
//       remainingAmount_number.textContent = `${remaining.toLocaleString()} VND`;
//   }

//   // Save to localStorage
//   function saveToLocalStorage() {
//       try {
//           localStorage.setItem('monthlyCategories', JSON.stringify(monthlyCategories));
//           localStorage.setItem('transactions', JSON.stringify(transactions));
//           localStorage.setItem('categoryIdCounter', categoryIdCounter.toString());
//           localStorage.setItem('transactionIdCounter', transactionIdCounter.toString());
//       } catch (e) {
//           console.error('Error saving to localStorage:', e);
//           alert('Lỗi khi lưu dữ liệu.');
//       }
//   }
// });
const monthlyCategories = JSON.parse(localStorage.getItem(`monthlyCategories`)) || []
const transactions = JSON.parse(localStorage.getItem(`transactions`)) || []
let sameID
const monthlyBudget_btn = document.getElementById(`monthlyBudget-button`)
const monthlyBudget_input = document.getElementById(`monthlyBudget-input`)
const arrowAccount = document.getElementById(`arrowAccount`)
const logout = document.getElementById(`logout`)
const btnShow = document.getElementById(`btnShow`)
const btnHide = document.getElementById(`btnHide`)
const chooseMonth_input = document.getElementById(`chooseMonth-input`)
const logoutNotification = document.getElementById(`logoutNotification`)
const btnlogout_yes = document.getElementById(`btnlogout_yes`)
const btnlogout_no = document.getElementById(`btnlogout_no`)
const monthlyCategoryManagement_CategoryName = document.getElementById(`monthlyCategoryManagement-CategoryName`)
const monthlyCategoryManagement_LimitMoney = document.getElementById(`monthlyCategoryManagement-LimitMoney`)
const btn_addCategory = document.getElementById(`btn-addCategory`)
const spending_addBtn = document.getElementById(`spending-addBtn`)
const monthlyCategoryManagement_Lists = document.getElementById(`monthlyCategoryManagement-Lists`)
const monthlyCategoryManagement_List_delete = document.getElementsByClassName(`monthlyCategoryManagement-List-delete`)
const monthlyCategoryManagement_List_edit = document.getElementsByClassName(`monthlyCategoryManagement-List-edit`)
const deleteNotification = document.getElementById(`deleteNotification`)
const btnDlt_yes = document.getElementById(`btnDlt_yes`)
const btnDlt_no = document.getElementById(`btnDlt_no`)
const spending_numberMoney = document.getElementById(`spending-numberMoney`)
const spending_note = document.getElementById(`spending-note`)
const remainingAmount_number = document.getElementById(`remainingAmount-number`)
const editNotice = document.getElementById(`editNotice`)
const editSuccess = document.getElementById(`editSuccess`)
const editExitSuccess = document.getElementById(`editExitSuccess`)
const textEdit = document.getElementById(`textEdit`)
const numberEdit = document.getElementById(`numberEdit`)
const transactionHistory_list = document.getElementById("transactionHistory_list")
const transactionHistory_listLine_delete=document.getElementsByClassName(`transactionHistory-listLine_delete`)
const deleteTransaction=document.getElementById(`deleteTransaction`)
const btnDltTRan_yes=document.getElementById(`btnDltTRan_yes`)
const btnDltTRan_no=document.getElementById(`btnDltTRan_no`)

displaymonthlyCategoryManagement()
deleteMonthlyCategoryManagement_List()
displayTransactionHistory_listLine()
//nút đăng xuất
arrowAccount.onclick= function () {
  if (logout.style.display === `block`) {
    logout.style.display = `none`
    btnShow.style.display = `block`
    btnHide.style.display = `none`
  } else {
    logout.style.display = `block`
    btnShow.style.display = `none`
    btnHide.style.display = `block`
  }
}
logout.onclick= function () {
  logoutNotification.style.display = `block`

  btnlogout_yes.onclick= function () {
    window.location.href = `http://127.0.0.1:5500/STRUCTURE_FINANCE/pages/login.html`
  }
  btnlogout_no.onclick= function () {
    logoutNotification.style.display = `none`

  }

}
// lưu ngân sách tháng


monthlyBudget_btn.onclick= function () {


  if (monthlyBudget_input.value === `` || chooseMonth_input.value === ``) {
    alert(`không để trống ô nhập trước khi lưu`)
  } else {
    addLocal()

  }

}
//thêm danh mục
btn_addCategory.onclick= function () {
  if (monthlyCategoryManagement_CategoryName.value === `` || monthlyCategoryManagement_LimitMoney.value === ``) {
    alert(`không để trống ô nhập trước khi lưu`)
  } else if (monthlyCategoryManagement_CategoryName.value === `uống rựu`) {
    alert(`không hợp lệ`)
  }
  else {

    addLocal()
    displaymonthlyCategoryManagement()
    displayTransactionHistory_listLine()
  }
}
//thêm tiền chi tiêu
spending_addBtn.onclick= function () {
  if (spending_numberMoney.value.trim() === `` || spending_note.value.trim() === ``) {
    alert(`không để trống ô nhập trước khi thêm`)
  } else {
    addLocal()

  }
}

//

function addLocal() {
  console.log(`****************`)

  if (monthlyCategoryManagement_CategoryName.value !== `` && monthlyCategoryManagement_LimitMoney.value !== ``) {
    let existingMonth = monthlyCategories.find(function (el) {
      return el.month === chooseMonth_input.value;
    });

    if (existingMonth) {
      let newCategory = {
        id: Math.random(),
        name: monthlyCategoryManagement_CategoryName.value,
        budget: monthlyBudget_input.value,
      };

      existingMonth.categories.push(newCategory);
      sameID = newCategory.id;


    } else {
      let newMonthlyCategory = {
        month: chooseMonth_input.value,
        categories: [{
          id: Math.random(),
          name: monthlyCategoryManagement_CategoryName.value,
          budget: monthlyBudget_input.value,
        }],
        amount: monthlyCategoryManagement_LimitMoney.value,
      };

      sameID = newMonthlyCategory.categories[0].id;
      monthlyCategories.push(newMonthlyCategory);


    }


    let newTransaction = {
      id: sameID,
      date: `${Math.ceil(Math.random() * 26) + 2}-${chooseMonth_input.value}`,
      amount: spending_numberMoney.value,
      description: spending_note.value,
      categoryId: sameID,
      monthCategoryId: sameID,
    };
    console.log(`ngày tháng năm:`, newTransaction.date)
    
    transactions.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    localStorage.setItem("monthlyCategories", JSON.stringify(monthlyCategories));

    spendingByCategory();
  }
  console.log(`**************`);
}

function displaymonthlyCategoryManagement() {

  monthlyCategoryManagement_Lists.innerHTML = ""


  for (let i in monthlyCategories) {
    for (let j in monthlyCategories[i].categories) {
      let div = `
      <div class="monthlyCategoryManagement_List">
        <div>${monthlyCategories[i].categories[j].name} - giới hạn: <span>${monthlyCategories[i].amount} VND</span></div>
        <div class="monthlyCategoryManagement-List-edit-delete">
          <span class="monthlyCategoryManagement-List-edit" data-month-index="${i}" data-category-id="${monthlyCategories[i].categories[j].id}">sửa</span>
          <span class="monthlyCategoryManagement-List-delete" data-month-index="${i}" data-category-id="${monthlyCategories[i].categories[j].id}">xoá</span>
        </div>
      </div>
    `

      monthlyCategoryManagement_Lists.innerHTML += div
    }

  }

  deleteMonthlyCategoryManagement_List()
  editMonthlyCategoryManagement_List()
}
//xoá danh mục (theo tháng)
function deleteMonthlyCategoryManagement_List() {
  for (let i = 0; i < monthlyCategoryManagement_List_delete.length; i++) {
    monthlyCategoryManagement_List_delete[i].addEventListener(`click` ,function () {
      let monthIndex = parseInt(this.getAttribute("data-month-index"))
      let categoryId = parseFloat(this.getAttribute("data-category-id"))

      deleteNotification.style.display = `block`
      btnDlt_yes.onclick= function () {
        deleteNotification.style.display = `none`
        let findIndex = monthlyCategories[monthIndex].categories.findIndex(function (el) {
          return el.id === categoryId
        })

        // if(findIndex!==1){
        //   monthlyCategories.splice(findIndex,1)
        // }
        if (findIndex !== -1) {
          monthlyCategories[monthIndex].categories.splice(findIndex, 1)
          if (monthlyCategories[monthIndex].categories.length === 0) {
            monthlyCategories.splice(monthIndex, 1); // xoá cả tháng
          }
          displaymonthlyCategoryManagement()

          localStorage.setItem("monthlyCategories", JSON.stringify(monthlyCategories));

        }
      }
      btnDlt_no.onclick= function () {
        deleteNotification.style.display = `none`

      }

    })
  }

}
//sửa danh mục
function editMonthlyCategoryManagement_List() {

  for (let i = 0; i < monthlyCategoryManagement_List_edit.length; i++) {
    monthlyCategoryManagement_List_edit[i].addEventListener(`click` , function () {
      let monthIndex = parseInt(this.getAttribute("data-month-index"))
      let categoryId = parseFloat(this.getAttribute("data-category-id"))


      //   monthlyCategories.splice(findIndex, 1)
      editNotice.style.display = `block`


      editSuccess.onclick =function () {

        let findIndex = monthlyCategories[monthIndex].categories.findIndex(function (el) {
          return el.id === categoryId
        })
        if (findIndex !== -1) {
          monthlyCategories[monthIndex].categories[findIndex].name = textEdit.value
          monthlyCategories[monthIndex].amount = numberEdit.value

          displaymonthlyCategoryManagement()
          localStorage.setItem("monthlyCategories", JSON.stringify(monthlyCategories));
          editNotice.style.display = `none`
        }
      }
      editExitSuccess.onclick= function () {
        editNotice.style.display = `none`
      }
      // }


    })
  }

}
//tính số tiền còn lại
// function spendingByCategory() {
//   remainingAmount_number.innerHTML = ``
//   let kq = monthlyBudget_input.value - spending_numberMoney.value
//   remainingAmount_number.innerHTML = `
//  <div id="remainingAmount-number"> ${kq} VND</div>
// `

// }
function spendingByCategory() {
  let kq = Number(monthlyBudget_input.value) - Number(spending_numberMoney.value)
  remainingAmount_number.textContent = `${kq} VND`
}
//in ra lịch sử giao dịch
function displayTransactionHistory_listLine() {
  console.log("monthlyCategories", monthlyCategories);
  transactionHistory_list.innerHTML = ``;

  for (let i in monthlyCategories) {
    for (let j in monthlyCategories[i].categories) {
      for (let k in transactions) {
        if (String(transactions[k].categoryId) === String(monthlyCategories[i].categories[j].id)){
          let div = `  
          <div class="transactionHistory-listLine">   
              <div class="transactionHistory-listLine_text">
                <div>${monthlyCategories[i].categories[j].name}</div>-
                <div> ${transactions[k].description} --${transactions[k].date}</div>:
                <div><span> ${transactions[k].amount} </span>VND</div>
              </div>
              <div class="transactionHistory-listLine_delete" data-month-index="${i}" data-category-id="${monthlyCategories[i].categories[j].id}">Xoá</div>
          </div>
          `;
          transactionHistory_list.innerHTML += div;

        }
      }
    }
  }
}
