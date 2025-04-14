//  const monthlyCategories = [
//   {

//     month: '2024-03',

//     categories: [
//       { id: 1, name: 'Ăn uống', budget: 100000 },

//     ],
//     amount: 30000,
//   },

//   {

//     month: '2024-04',
//     categories: [
//       { id: 2, name: 'Mua sắm', budget: 500000 },

//     ],
//     amount: 60000,
//   },
// ]
//  const transactions= [
//     {
//       id: 1,
//       date: "2024-04-01",
//       amount: 50000,
//       description: "Ăn sáng",
//       categoryId: 1,
//       monthCategoryId: 1
//     },
//     {
//       id: 2,
//       date: "2024-04-02",
//       amount: 200000,
//       description: "Mua áo sơ mi",
//       categoryId: 2,
//       monthCategoryId: 2
//     }
//   ]
const monthlyCategories =JSON.parse(localStorage.getItem(`monthlyCategories`)) || [];
const transactions=JSON.parse(localStorage.getItem(`transactions`)) || [];
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
const transactionHistory_listLine_delete = document.getElementsByClassName(`transactionHistory-listLine_delete`)
const deleteTransaction = document.getElementById(`deleteTransaction`)
const btnDltTran_yes = document.getElementById(`btnDltTran_yes`)
const btnDltTran_no = document.getElementById(`btnDltTran_no`)
const search_text = document.getElementById(`search-text`)
const searchTransaction = document.getElementById(`searchTransaction`)
const searchBtn = document.getElementById(`searchBtn`)
const editExitSearch = document.getElementById(`editExitSearch`)
const searchProduct = document.getElementById(`searchProduct`)
const searchResult = document.getElementById(`searchResult`)
const exitSearchResult = document.getElementById(`exitSearchResult`)
const displaySort = document.getElementById(`displaySort`)
const sortBtn = document.getElementById(`sortBtn`)
const noticeSort = document.getElementById(`noticeSort`)
const btnIncrease = document.getElementById(`btnIncrease`)
const btnReduce = document.getElementById(`btnReduce`)


displaymonthlyCategoryManagement()
deleteMonthlyCategoryManagement_List()
displayTransactionHistory_listLine()
//nút đăng xuất
arrowAccount.onclick = function () {
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
logout.onclick = function () {
  logoutNotification.style.display = `block`

  btnlogout_yes.onclick = function () {
    window.location.href = `http://127.0.0.1:5501/pages/login.html`
  }
  btnlogout_no.onclick = function () {
    logoutNotification.style.display = `none`

  }

}
// lưu ngân sách tháng


monthlyBudget_btn.onclick = function () {


  if (monthlyBudget_input.value === `` || chooseMonth_input.value === ``) {
    alert(`không để trống ô nhập trước khi lưu`)
  } else {
    addLocal()

  }

}
//thêm danh mục
btn_addCategory.onclick = function () {
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
spending_addBtn.onclick = function () {
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
        budget: monthlyCategoryManagement_LimitMoney.value,
      };

      existingMonth.categories.push(newCategory);
      
      sameID = newCategory.id;
      localStorage.setItem("monthlyCategories", JSON.stringify(monthlyCategories));

    } else {
      let newMonthlyCategory = {
        month: chooseMonth_input.value,
        categories: [{
          id: Math.random(),
          name: monthlyCategoryManagement_CategoryName.value,
          budget: monthlyCategoryManagement_LimitMoney.value,
        }],
        amount: monthlyBudget_input.value,
      };

      sameID = newMonthlyCategory.categories[0].id;
      monthlyCategories.push(newMonthlyCategory);
      localStorage.setItem("monthlyCategories", JSON.stringify(monthlyCategories));

    }


    let newTransaction = {
      id: sameID,
      date: `${Math.ceil(Math.random() * 26) + 2}-${chooseMonth_input.value}`,
      amount: spending_numberMoney.value,
      description: spending_note.value,
      categoryId: sameID,
      monthCategoryId: sameID,
    };

    transactions.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    // localStorage.setItem("monthlyCategories", JSON.stringify(monthlyCategories));

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
        <div>${monthlyCategories[i].categories[j].name} - giới hạn: <span>${monthlyCategories[i].categories[j].budget} VND</span></div>
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
    monthlyCategoryManagement_List_delete[i].addEventListener(`click`, function () {
      let monthIndex = parseInt(this.getAttribute("data-month-index"))
      let categoryId = parseFloat(this.getAttribute("data-category-id"))

      deleteNotification.style.display = `block`
      btnDlt_yes.onclick = function () {
        deleteNotification.style.display = `none`
        let findIndex = monthlyCategories[monthIndex].categories.findIndex(function (el) {
          return el.id === categoryId
        })

        // if(findIndex!==1){
        //   monthlyCategories.splice(findIndex,1)
        // }
        if (findIndex !== -1) {
          monthlyCategories[monthIndex].categories.splice(findIndex, 1)
          localStorage.setItem("monthlyCategories", JSON.stringify(monthlyCategories));
            displaymonthlyCategoryManagement()
          if (monthlyCategories[monthIndex].categories.length === 0) {
            monthlyCategories.splice(monthIndex, 1); // xoá cả tháng
            localStorage.setItem("monthlyCategories", JSON.stringify(monthlyCategories));
            displaymonthlyCategoryManagement()
          }
          

          


        }
      }
      btnDlt_no.onclick = function () {
        deleteNotification.style.display = `none`

      }

    })
  }

}
//sửa danh mục
function editMonthlyCategoryManagement_List() {

  for (let i = 0; i < monthlyCategoryManagement_List_edit.length; i++) {
    monthlyCategoryManagement_List_edit[i].addEventListener(`click`, function () {
      let monthIndex = parseInt(this.getAttribute("data-month-index"))
      let categoryId = parseFloat(this.getAttribute("data-category-id"))


      //   monthlyCategories.splice(findIndex, 1)
      editNotice.style.display = `block`


      editSuccess.onclick = function () {

        let findIndex = monthlyCategories[monthIndex].categories.findIndex(function (el) {
          return el.id === categoryId
        })
        if (findIndex !== -1) {
          monthlyCategories[monthIndex].categories[findIndex].name = textEdit.value
          monthlyCategories[monthIndex].categories[findIndex].budget = numberEdit.value
          localStorage.setItem("monthlyCategories", JSON.stringify(monthlyCategories));
          displaymonthlyCategoryManagement()

          editNotice.style.display = `none`
        }
      }
      editExitSuccess.onclick = function () {
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

  transactionHistory_list.innerHTML = ``;

  for (let i in monthlyCategories) {
    for (let j in monthlyCategories[i].categories) {
      for (let k in transactions) {
        if (String(transactions[k].categoryId) === String(monthlyCategories[i].categories[j].id)) {
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
  deleteTransactionHistory()
  setupSearchFunction()
  sortTransacsion()
}
//xoá lịch sử giao dịch
function deleteTransactionHistory() {
  for (let i = 0; i < transactionHistory_listLine_delete.length; i++) {
    transactionHistory_listLine_delete[i].addEventListener("click", function () {
      let monthIndex = parseInt(this.getAttribute("data-month-index"))
      let categoryId = parseFloat(this.getAttribute("data-category-id"))

      deleteTransaction.style.display = "block"

      btnDltTran_yes.onclick = function () {
        deleteTransaction.style.display = "none"

        // Xoá transaction đầu tiên có categoryId phù hợp
        let transIndex = transactions.findIndex(function (tran) {
          return tran.categoryId === categoryId
        })

        if (transIndex !== -1) {
          transactions.splice(transIndex, 1)
          localStorage.setItem("transactions", JSON.stringify(transactions))
        }

        // Xoá danh mục khỏi monthlyCategories
        let categoryIndex = monthlyCategories[monthIndex].categories.findIndex(function (el) {
          return el.id === categoryId
        })

        if (categoryIndex !== -1) {
          monthlyCategories[monthIndex].categories.splice(categoryIndex, 1)
          localStorage.setItem("monthlyCategories", JSON.stringify(monthlyCategories))
          // Nếu sau khi xoá, tháng không còn danh mục nào thì xoá luôn cả tháng
          if (monthlyCategories[monthIndex].categories.length === 0) {
            monthlyCategories.splice(monthIndex, 1)
            localStorage.setItem("monthlyCategories", JSON.stringify(monthlyCategories))
          }
        }

        // Cập nhật lại giao diện & lưu dữ liệu

        localStorage.setItem("monthlyCategories", JSON.stringify(monthlyCategories))
        localStorage.setItem("transactions", JSON.stringify(transactions))
        displaymonthlyCategoryManagement()
        displayTransactionHistory_listLine()
      }

      btnDltTran_no.onclick = function () {
        deleteTransaction.style.display = "none"
      }
    })
  }
}

function setupSearchFunction() {
  search_text.addEventListener("click", function () {
    let categoryId = parseFloat(this.getAttribute("data-category-id"))
    searchTransaction.style.display = "block";

    searchBtn.onclick = function () {
      const searchValue = searchProduct.value.trim();

      const findIndexProduct = transactions.findIndex(function (el) {
        return el.description === searchValue;
      });

      if (findIndexProduct !== -1) {
        alert(`${transactions[findIndexProduct].description}-${transactions[findIndexProduct].amount} VND`)

      } else {
        alert("Không tìm thấy giao dịch.");
      }

      searchTransaction.style.display = "none";
    };

    editExitSearch.onclick = function () {
      searchTransaction.style.display = "none";
    };
  });
}

function sortTransacsion() {
  sortBtn.addEventListener(`click`, function () {
    noticeSort.style.display = `block`

  })
  btnIncrease.onclick = function () {
    noticeSort.style.display = `none`
    displaySort.innerHTML = ``
    displaySort.style.display = `block`
    for (let i = 0; i < transactions.length; i++) {
      for (let j = 0; j < transactions.length - 1; j++) {
        if (transactions[j].amount > transactions[j + 1].amount) {
          let temp = transactions[j]
          transactions[j] = transactions[j + 1]
          transactions[j + 1] = temp
        }
      }
    }
    for (let i = 0; i < transactions.length; i++) {
      let div = `
      <div>${i + 1}. ${transactions[i].description}--${transactions[i].amount}  VND</div>
      `
      displaySort.innerHTML += div
    }

    let button = document.createElement(`button`)
    button.innerText = `thoát`
    button.setAttribute(`id`, `exitNoticeSort`)
    displaySort.appendChild(button)
    const exitNoticeSort = document.getElementById(`exitNoticeSort`)
    exitNoticeSort.onclick = function () {
      displaySort.style.display = `none`
    }

  }
  btnReduce.onclick = function () {
    noticeSort.style.display = `none`
    displaySort.innerHTML = ``
    displaySort.style.display = `block`
    for (let i = 0; i < transactions.length; i++) {
      for (let j = 0; j < transactions.length - 1; j++) {
        if (transactions[j].amount < transactions[j + 1].amount) {
          let temp = transactions[j]
          transactions[j] = transactions[j + 1]
          transactions[j + 1] = temp
        }
      }
    }
    for (let i = 0; i < transactions.length; i++) {
      let div = `
      <div>${i + 1}. ${transactions[i].description}--${transactions[i].amount}  VND</div>
      `
      displaySort.innerHTML += div
    }

    let button = document.createElement(`button`)
    button.innerText = `thoát`
    button.setAttribute(`id`, `exitNoticeSort`)
    displaySort.appendChild(button)
    const exitNoticeSort = document.getElementById(`exitNoticeSort`)
    exitNoticeSort.onclick = function () {
      displaySort.style.display = `none`
    }

  }
}
// delete localStorage.transactions
// delete localStorage.monthlyCategories




