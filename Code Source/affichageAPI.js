let AllData = []
let FetchAllDecode
// let whereWeAre = 0
let NewClientRemamber = true
let editIfClicked = false
let MyData
let preventDoubleClick = false
// when clicking ++/-- don't hide cart please
let click_plus_minus_cart = false


//   Know  Place of List Of Products

// 





//============== Cart To save important data =========




// --------------- End ---------


function logout() {
  document.querySelector('.containerr').style = "display:none"
  document.querySelector('.main').style = "display:block"
  login()
}

function login() {
  document.getElementById('loginBtn').addEventListener('click',(e)=>{
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    if (username != "" && password != "") {

      console.log("ddd")
      $.ajax({
        url : 'login.php',
        type : 'POST',
        data :{
          username : username,
          password : password
        },
        success:(data)=>{
          if (data == "LoginTrue") {
            document.getElementById('username').value =""
            document.getElementById('password').value =""
            document.querySelector('.containerr').style = "display:flex"
            document.querySelector('.main').style = "display:none"
            document.getElementById('dashbordShow').click()
            cards()
            weekChart()
            FetchAll()
            affichage()
          }else{
            console.log("Login Wrong")
          }
        }
      })
    }


  })
}


document.getElementById('logoutBtn').addEventListener('click',()=>{
  console.log('logout')
  $.ajax({
    url : 'logout.php',
    type : 'post',
    data : {
      logout : "true"
    },
    success : (data)=>{
      if(data == "logout")
      logout()
    }
  })
})


function FetchAll() {
    $.ajax({
        url: 'fetchDb.php',
        type: 'GET',
        datatype: 'json',
        success: function (data) {
          if (data=="NoConnect") {
            console.log("fetchAll")
            logout()
            return;
          }
          document.querySelector('.containerr').style = 'display : flex'
          // console.log(data)
            FetchAllDecode = JSON.parse(data)


            AllData = []
            // let know = myData.length/20;
            let smallArr = [];
            

            // ============== Options =================
            document.querySelector('#selectNums').innerHTML = ''

            FetchAllDecode.forEach(element => {
                if (smallArr.length < 15) {

                    smallArr.push(element)

                    if (FetchAllDecode[FetchAllDecode.length - 1] == element) {
                        AllData.push(smallArr);
                    }


                } else {
                    AllData.push(smallArr)
                    smallArr = [];
                    smallArr.push(element)
                    if (FetchAllDecode[FetchAllDecode.length - 1] == element) {
                        AllData.push(smallArr);
                
                    }
                }

                
            })




            
            for (let index = 0; index < AllData.length; index++) {


                var el = document.createElement('option');
                el.value = index
                el.innerHTML = index
                el.setAttribute('class', 'nums')
                document.querySelector('#selectNums').append(el)

            }



        }
    })

    console.log('Goal')
    document.querySelector('#selectNums').style = 'display: block; margin: auto 0; width: 110px'
    document.querySelector('#selectNumsClient').style = 'display: none'

}


FetchAll()


function affichage() {

    $.ajax({
        url: 'fetchDb.php',
        type: 'GET',
        datatype: 'json',
        success: function (data) {
          if (data=="NoConnect") {
            console.log("affichage")

            logout()
            return;
          }
          // console.log(data)

            FetchAllDecode = JSON.parse(data)


// ============================

document.getElementById('search').value =''

            document.querySelector('.co').innerHTML = `<tr>
            <th style="text-align: center;">image</th>
            <th style="text-align: center;">label</th>
            <th style="text-align: center;">prix</th>
            <th style="text-align: center;">stock</th>
            <th style="text-align: center;">Operations</th>
            </tr>
            `

            // if (arrayWhere==AllData.length) return;

            AllData[0].forEach(element => {

                if (element[4] <= 10 && element[4] != 0) {
                    //    element[1] = `${element[1]} <span class="badge bg-warning text-dark">Will End Soon</span>`
                    if (NewClientRemamber == true) {


                        document.querySelector('.co').innerHTML +=
                            `
                        <tr class='TrToHideSearch'>
                        <td class='imageTD'><img class='productImage' style='width:100px' src='images/${element[3]}'></td>
                
                        <td><span class='nameProduit'>${element[1]}</span> <span class="badge bg-warning" style='color: #3427b0;background-color:#fff!important'>Will End Soon</span></td>
                        <td class='priceProd'>${element[2]}</td>
                        <td><span class='DetectCurrentStock'>${element[4]}</span><br>
                        
                        <div class="popup">
                        <i class="toogleMinus ri-checkbox-indeterminate-fill"></i>
                       
                        <span class="popuptext myPopup" >
                          <input class="stockMinus" type="text" placeholder="Quntity" style='width: 60px;'>
                          <button class="saveMinus btn btn-primary" value='${element[0]}'>save</button>
                          <span class='alertZoneMinus' style='color:red; font-size:15px'></span>
                        </span>
                      </div>
                
                
                      <div class="popup2">
                      <i class='tooglePlus ri-add-box-fill'></i>
                      <span class="popuptext2 myPopup2">
                        <input class="stockPlus" type="text" placeholder="Quntity" style='width: 60px;'>
                        <button class="savePlus btn btn-primary" value='${element[0]}'>save</button>
                        <span class='alertZonePlus' style='color:red; font-size:15px'></span>
                      </span>
                    </div>
                
                
                        </td>
                        <td>
                        <i class="deleteThis ri-close-circle-line" value='${element[0]}'></i>
                        <i class="editThis ri-edit-2-fill" priceBuyingThis='${element[5]}' value='${element[0]}' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"></i>
                        <div class="popupAddCart" style='display : inline-block'>
                        <i productid='${element[0]}' class='toogleAddCart ri-shopping-cart-fill'></i>
                        <span class="popuptextAddCart myPopupAddCart">
                          <input class="stockAddCart" type="text" placeholder="Quntity" value='1' style='width: 60px;'>
                          <button class="saveAddCart btn" value='${element[0]}'>save</button>
                          <span class='alertZoneAddCart' style='color:red; font-size:15px'></span>
                        </span>
                      </div>
                      <div style='display : inline-block'><i class="ri-bar-chart-2-fill productStatistics" productid='${element[0]}' data-bs-toggle="modal" data-bs-target="#StatisticsModal"></i></div>
                        </td>
                        </tr>
                        `
                        deleteThis()
                        editThis()
                        ProductStatistics()
                        toogleMinus()
                        stockMinus()
                        tooglePlus()
                        stockPlus()
                        toogleAddCart()
                        AddProductReal();
                        
                        
                        return;
                    }


                }

                if (element[4] == 0) {
                    // element[1] = `${element[1]} <span class="badge bg-danger" style='color:#fff'>Out Stock</span>`
                    if (NewClientRemamber == true) {


                        document.querySelector('.co').innerHTML +=
                            `
                        <tr  class='TrToHideSearch'>
                        <td class='imageTD'><img class='productImage' style='width:100px' src='images/${element[3]}'></td>
                
                        <td><span class='nameProduit'>${element[1]}</span> <span class="badge bg-danger" style='color: #3427b0;background-color:#fff!important'>Out Stock</span></td>
                        <td class='priceProd'>${element[2]}</td>
                        <td><span class='DetectCurrentStock'>${element[4]}</span><br>
                        
                        <div class="popup">
                        <i class="toogleMinus ri-checkbox-indeterminate-fill"></i>
                       
                        <span class="popuptext myPopup" >
                          <input class="stockMinus" type="text" placeholder="Quntity" style='width: 60px;'>
                          <button class="saveMinus btn btn-primary" value='${element[0]}'>save</button>
                          <span class='alertZoneMinus' style='color:red; font-size:15px'></span>
                        </span>
                      </div>
                
                
                      <div class="popup2">
                      <i class='tooglePlus ri-add-box-fill'></i>
                      <span class="popuptext2 myPopup2">
                        <input class="stockPlus" type="text" placeholder="Quntity" style='width: 60px;'>
                        <button class="savePlus btn btn-primary" value='${element[0]}'>save</button>
                        <span class='alertZonePlus' style='color:red; font-size:15px'></span>
                      </span>
                    </div>
                
                
                        </td>
                        <td>
                        <i class="deleteThis ri-close-circle-line" value='${element[0]}'></i>
                        <i class="editThis ri-edit-2-fill" priceBuyingThis='${element[5]}' value='${element[0]}' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"></i>
                        <div class="popupAddCart" style='display : inline-block'>
                        <i productid='${element[0]}' class='toogleAddCart ri-shopping-cart-fill'></i>
                        <span class="popuptextAddCart myPopupAddCart">
                          <input class="stockAddCart" type="text" placeholder="Quntity" value='1' style='width: 60px;'>
                          <button class="saveAddCart btn" value='${element[0]}'>save</button>
                          <span class='alertZoneAddCart' style='color:red; font-size:15px'></span>
                        </span>
                      </div>
                      <div style='display : inline-block'><i class="ri-bar-chart-2-fill productStatistics" productid='${element[0]}' data-bs-toggle="modal" data-bs-target="#StatisticsModal"></i></div>
                        </td>
                        </tr>
                        `


                        deleteThis()
                        editThis()
                        ProductStatistics()
                        toogleMinus()
                        stockMinus()
                        tooglePlus()
                        stockPlus()
                        toogleAddCart()
                        AddProductReal();

                        return;

                    } 


                }

                // else{
                //    element[1] = `${element[1]} <span class="badge bg-warning text-dark">Will End Soon</span>`
                if (NewClientRemamber == true) {


                    document.querySelector('.co').innerHTML +=
                        `
                        <tr class='TrToHideSearch'>
                        <td class='imageTD'><img class='productImage' style='width:100px' src='images/${element[3]}'></td>
                
                        <td><span class='nameProduit'>${element[1]}</span></td>
                        <td class='priceProd'>${element[2]}</td>
                        <td><span class='DetectCurrentStock'>${element[4]}</span><br>
                        
                        <div class="popup">
                        <i class="toogleMinus ri-checkbox-indeterminate-fill"></i>
                       
                        <span class="popuptext myPopup" >
                          <input class="stockMinus" type="text" placeholder="Quntity" style='width: 60px;'>
                          <button class="saveMinus btn btn-primary" value='${element[0]}'>save</button>
                          <span class='alertZoneMinus' style='color:red; font-size:15px'></span>
                        </span>
                      </div>
                
                
                      <div class="popup2">
                      <i class='tooglePlus ri-add-box-fill'></i>
                      <span class="popuptext2 myPopup2">
                        <input class="stockPlus" type="text" placeholder="Quntity" style='width: 60px;'>
                        <button class="savePlus btn btn-primary" value='${element[0]}'>save</button>
                        <span class='alertZonePlus' style='color:red; font-size:15px'></span>
                      </span>
                    </div>
                
                
                        </td>
                        <td>
                        <i class="deleteThis ri-close-circle-line" value='${element[0]}'></i>
                        <i class="editThis ri-edit-2-fill" priceBuyingThis='${element[5]}' value='${element[0]}' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"></i>
                        <div class="popupAddCart" style='display : inline-block'>
                        <i productid='${element[0]}' class='toogleAddCart ri-shopping-cart-fill'></i>
                        <span class="popuptextAddCart myPopupAddCart">
                          <input class="stockAddCart" type="text" placeholder="Quntity" value='1' style='width: 60px;'>
                          <button class="saveAddCart btn" value='${element[0]}'>save</button>
                          <span class='alertZoneAddCart' style='color:red; font-size:15px'></span>
                        </span>
                      </div>
                      <div style='display : inline-block'><i class="ri-bar-chart-2-fill productStatistics" productid='${element[0]}' data-bs-toggle="modal" data-bs-target="#StatisticsModal"></i></div> 
                      </td>
                        </tr>
                    
                        `

                    deleteThis()
                    editThis()
                    ProductStatistics()
                    toogleMinus()
                    stockMinus()
                    tooglePlus()
                    stockPlus()
                    toogleAddCart()
                    AddProductReal();

                    return;

                }

                // }







            })


            // })
            // });

            // }


            document.getElementById('selectNums').onchange = () => {


                // document.querySelectorAll('.nums').forEach(element => {
                // console.log(element)
                // element.addEventListener('select',()=>{

                if (document.getElementById('selectNums').value >= 0) {

                    let arrayWhere = document.getElementById('selectNums').value
                    //    AllData[arrayWhere].forEach(element => {

                    document.querySelector('.co').innerHTML = `<tr>
        <th style="text-align: center;">image</th>
        <th style="text-align: center;">label</th>
        <th style="text-align: center;">prix</th>
        <th style="text-align: center;">stock</th>
        <th style="text-align: center;">Operations</th>
        </tr>`

                    if (arrayWhere == AllData.length) return;

                    AllData[arrayWhere].forEach(element => {

                        if (element[4] <= 10 && element[4] != 0) {
                            //    element[1] = `${element[1]} <span class="badge bg-warning text-dark">Will End Soon</span>`
                            if (NewClientRemamber == true) {


                                document.querySelector('.co').innerHTML +=
                                    `
                    <tr  class='TrToHideSearch'>
                    <td class='imageTD'><img class='productImage' style='width:100px' src='images/${element[3]}'></td>
            
                    <td><span class='nameProduit'>${element[1]}</span> <span class="badge bg-warning" style='color: #3427b0;background-color:#fff!important'>Will End Soon</span></td>
                    <td class='priceProd'>${element[2]}</td>
                    <td><span class='DetectCurrentStock'>${element[4]}</span><br>
                        
                    <div class="popup">
                    <i class="toogleMinus ri-checkbox-indeterminate-fill"></i>
                   
                    <span class="popuptext myPopup" >
                      <input class="stockMinus" type="text" placeholder="Quntity" style='width: 60px;'>
                      <button class="saveMinus btn btn-primary" value='${element[0]}'>save</button>
                      <span class='alertZoneMinus' style='color:red; font-size:15px'></span>
                    </span>
                  </div>
            
            
                  <div class="popup2">
                  <i class='tooglePlus ri-add-box-fill'></i>
                  <span class="popuptext2 myPopup2">
                    <input class="stockPlus" type="text" placeholder="Quntity" style='width: 60px;'>
                    <button class="savePlus btn btn-primary" value='${element[0]}'>save</button>
                    <span class='alertZonePlus' style='color:red; font-size:15px'></span>
                  </span>
                </div>
            
            
                    </td>
                    <td>
                    <i class="deleteThis ri-close-circle-line" value='${element[0]}'></i>
                    <i class="editThis ri-edit-2-fill" priceBuyingThis='${element[5]}' value='${element[0]}' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"></i>
                    <div class="popupAddCart" style='display : inline-block'>
                    <i productid='${element[0]}' class='toogleAddCart ri-shopping-cart-fill'></i>
                    <span class="popuptextAddCart myPopupAddCart">
                      <input class="stockAddCart" type="text" placeholder="Quntity" value='1' style='width: 60px;'>
                      <button class="saveAddCart btn" value='${element[0]}'>save</button>
                      <span class='alertZoneAddCart' style='color:red; font-size:15px'></span>
                    </span>
                  </div>
                  <div style='display : inline-block'><i class="ri-bar-chart-2-fill productStatistics" productid='${element[0]}' data-bs-toggle="modal" data-bs-target="#StatisticsModal"></i></div>
                  </td>
                    </tr>
                    `
                                deleteThis()
                                editThis()
                                ProductStatistics()
                                toogleMinus()
                                stockMinus()
                                tooglePlus()
                                stockPlus()
                                toogleAddCart()
                                AddProductReal();

                                return;
                            } 


                        }

                        if (element[4] == 0) {
                            // element[1] = `${element[1]} <span class="badge bg-danger" style='color:#fff'>Out Stock</span>`
                            if (NewClientRemamber == true) {


                                document.querySelector('.co').innerHTML +=
                                    `
                    <tr class='TrToHideSearch'>
                    <td class='imageTD'><img class='productImage' style='width:100px' src='images/${element[3]}'></td>
            
                    <td><span class='nameProduit'>${element[1]}</span> <span class="badge bg-danger" style='color: #3427b0;background-color:#fff!important'>Out Stock</span></td>
                    <td class='priceProd'>${element[2]}</td>
                    <td><span class='DetectCurrentStock'>${element[4]}</span><br>
                        
                        <div class="popup">
                        <i class="toogleMinus ri-checkbox-indeterminate-fill"></i>
                       
                        <span class="popuptext myPopup" >
                          <input class="stockMinus" type="text" placeholder="Quntity" style='width: 60px;'>
                          <button class="saveMinus btn btn-primary" value='${element[0]}'>save</button>
                          <span class='alertZoneMinus' style='color:red; font-size:15px'></span>
                        </span>
                      </div>
                
                
                      <div class="popup2">
                      <i class='tooglePlus ri-add-box-fill'></i>
                      <span class="popuptext2 myPopup2">
                        <input class="stockPlus" type="text" placeholder="Quntity" style='width: 60px;'>
                        <button class="savePlus btn btn-primary" value='${element[0]}'>save</button>
                        <span class='alertZonePlus' style='color:red; font-size:15px'></span>
                      </span>
                    </div>
                
                
                        </td>
                    <td>
                    <i class="deleteThis ri-close-circle-line" value='${element[0]}'></i>
                    <i class="editThis ri-edit-2-fill" priceBuyingThis='${element[5]}' value='${element[0]}' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"></i>
                    <div class="popupAddCart" style='display : inline-block'>
                    <i productid='${element[0]}' class='toogleAddCart ri-shopping-cart-fill'></i>
                    <span class="popuptextAddCart myPopupAddCart">
                      <input class="stockAddCart" type="text" placeholder="Quntity" value='1' style='width: 60px;'>
                      <button class="saveAddCart btn" value='${element[0]}'>save</button>
                      <span class='alertZoneAddCart' style='color:red; font-size:15px'></span>
                    </span>
                  </div>
                  <div style='display : inline-block'><i class="ri-bar-chart-2-fill productStatistics" productid='${element[0]}' data-bs-toggle="modal" data-bs-target="#StatisticsModal"></i></div>
                  </td>
                    </tr>
                    `


                                deleteThis()
                                editThis()
                                ProductStatistics()
                                toogleMinus()
                                stockMinus()
                                tooglePlus()
                                stockPlus()
                                toogleAddCart()
                                AddProductReal();
                                

                                return;

                            }


                        }

                        // else{
                        //    element[1] = `${element[1]} <span class="badge bg-warning text-dark">Will End Soon</span>`
                        if (NewClientRemamber == true) {


                            document.querySelector('.co').innerHTML +=
                                `
                    <tr class='TrToHideSearch'>
                    <td class='imageTD'><img class='productImage' style='width:100px' src='images/${element[3]}'></td>
            
                    <td><span class='nameProduit'>${element[1]}</span></td>
                    <td class='priceProd'>${element[2]}</td>
                    <td><span class='DetectCurrentStock'>${element[4]}</span><br>
                        
                        <div class="popup">
                        <i class="toogleMinus ri-checkbox-indeterminate-fill"></i>
                       
                        <span class="popuptext myPopup" >
                          <input class="stockMinus" type="text" placeholder="Quntity" style='width: 60px;'>
                          <button class="saveMinus btn btn-primary" value='${element[0]}'>save</button>
                          <span class='alertZoneMinus' style='color:red; font-size:15px'></span>
                        </span>
                      </div>
                
                
                      <div class="popup2">
                      <i class='tooglePlus ri-add-box-fill'></i>
                      <span class="popuptext2 myPopup2">
                        <input class="stockPlus" type="text" placeholder="Quntity" style='width: 60px;'>
                        <button class="savePlus btn btn-primary" value='${element[0]}'>save</button>
                        <span class='alertZonePlus' style='color:red; font-size:15px'></span>
                      </span>
                    </div>
                
                
                        </td>
                    <td>
                    <i class="deleteThis ri-close-circle-line" value='${element[0]}'></i>
                    <i class="editThis ri-edit-2-fill" priceBuyingThis='${element[5]}' value='${element[0]}' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"></i>
                    <div class="popupAddCart" style='display : inline-block'>
                    <i productid='${element[0]}' class='toogleAddCart ri-shopping-cart-fill'></i>
                    <span class="popuptextAddCart myPopupAddCart">
                      <input class="stockAddCart" type="text" placeholder="Quntity" value='1' style='width: 60px;'>
                      <button class="saveAddCart btn" value='${element[0]}'>save</button>
                      <span class='alertZoneAddCart' style='color:red; font-size:15px'></span>
                    </span>
                  </div>
                  <div style='display : inline-block'><i class="ri-bar-chart-2-fill productStatistics" productid='${element[0]}' data-bs-toggle="modal" data-bs-target="#StatisticsModal"></i></div>
                    </td>
                    </tr>
                
                    `

                            deleteThis()
                            editThis()
                            ProductStatistics()
                            toogleMinus()
                            stockMinus()
                            tooglePlus()
                            stockPlus()
                            toogleAddCart()
                            AddProductReal();
                            
                         

                            return;

                        } 

                        // }







                    })


                    // })
                    // });
                }
            }


        }

    })

    // fetchClient()

}

affichage()






// ========================== Delete API =============
function deleteThis() {
    document.querySelectorAll('.deleteThis').forEach(element => {
        element.addEventListener('click', () => {



            let deleteId = element.getAttribute('value');

            $.ajax({
                url: 'delete.php',
                type: 'post',
                data: {
                    'deleteId': deleteId
                },
                dataType: 'json',
                success: function (data) {
                  if (data=="NoConnect") {
                    logout()
                    return;
                  }
                    if (data.res == 1) {
                        FetchAll()
                        // element.closest('tr').remove()
                        affichage()
                        document.querySelector('.alertRes2').innerHTML = `
                        <div class="alert alert-danger alert-dismissible fade show  mx-auto mt-4" role="alert">
                         Product has been deleted
                          <a type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
                         </div>
                        `

                        if (editIfClicked == true) {



                            document.getElementById('editBtn').value = 'Save'
                            document.getElementById('editBtn').id = 'SaveBtn'
                            document.getElementById('cancelEdit').removeAttribute('class')
                            document.getElementById('cancelEdit').style = 'display:none'
                            document.getElementById('nameP').textContent = 'Name of Product'
                            document.getElementById('prixP').textContent = 'Price of Product'


                            document.getElementById('MyForm').removeAttribute('action')
                            document.getElementById('MyForm').setAttribute('action', 'add.php')
                            document.getElementById('label').value = null
                            document.getElementById('prix').value = null
                            document.getElementById('stock').value = null
                            editIfClicked = false
                            MyData = undefined

                        }

                    }

                },
            })

        })
    });

}





// ========================== Edit API =============

let editId

function editThis() {
    document.querySelectorAll('.editThis').forEach(element => {
        element.addEventListener('click', () => {

            editId = element.getAttribute('value');
            $.ajax({
                url: 'appendEditData.php',
                type: 'post',
                data: {
                    'editId': editId
                },
                datatype: 'json',
                success: function (data) {
                  if (data=="NoConnect") {
                    logout()
                    return;
                  }
                    data = JSON.parse(data)

                    document.getElementById('label').value = data['label']
                    document.getElementById('prix').value = data['prix']
                    document.getElementById('stock').value = data['stock']
                    document.getElementById('codebar').value = data['CodeBare']
                    document.getElementById('prixofBuying').value = data['BuyingPrice']
                    console.log(data['BuyingPrice'])
                    console.log(data)



                    if (editIfClicked == false) {
                        document.getElementById('SaveBtn').value = 'Edit'
                        document.getElementById('SaveBtn').id = 'editBtn'
                        document.getElementById('cancelEdit').setAttribute('class', 'btn')
                        document.getElementById('cancelEdit').style = 'display:block; margin:0 15px;width: 90px; height: 40px'
                        document.getElementById('nameP').textContent = 'Edit Name of Product'
                        document.getElementById('prixP').textContent = 'Edit Price of Product'
                    }

                    // document.getElementById('MyForm').removeAttribute('action')
                    // document.getElementById('MyForm').setAttribute('action', `edit.php?editId=${editId}`)
                    MyData = data


                    EditV()
                    editIfClicked = true



                }
            })


        })
    });
}





function EditV() {




    document.getElementById('editBtn').addEventListener('click', (e) => {

        e.preventDefault();



        if (MyData != undefined) {
            let MyForm = document.getElementById('MyForm')
            let prix2 = document.getElementById('prix').value
            let label2 = document.getElementById('label').value
            let stock2 = document.getElementById('stock').value
            let img2 = document.getElementById('fileToUpload')
            let codeBar2 = document.getElementById('codebar').value
            let prixBuy = document.getElementById('prixofBuying').value


            // if ((label == "") && (prix == "") && (stock == "")) {

            //   return(
            //     document.querySelector('.alertRes').innerHTML = `
            //     <div class="alert alert-danger alert-dismissible fade show  mx-auto mt-4" role="alert">
            //     All fields are required
            //     <a type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
            //     </div>
            //      `
            //   );
                
                

            // }


            if ( Number(prixBuy) > Number(prix2)) {
              return(
                document.querySelector('.alertRes').innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show mx-auto mt-4" role="alert">
                 Enter a valid Buying Price
                  <a type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
                 </div>`
              );
            }


            if ((label2 == "") || (prix2 == "") || (stock2 == "") || (prixBuy == "") ) {
              console.log(prixBuy)
                document.querySelector('.alertRes').innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show  mx-auto mt-4" role="alert">
                 All fields are required
                  <a type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
                 </div>`

                return;

            }


            if (isNaN(prix2) || isNaN(stock2)) {

                document.querySelector('.alertRes').innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show  mx-auto mt-4" role="alert">
                 Please enter a valid number
                  <a type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
                 </div>
                `

                return;


            }

            if (prix2 == 0) {

                document.querySelector('.alertRes').innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show  mx-auto mt-4" role="alert">
                 Price can't set to zero
                  <a type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
                 </div>
                `

                return;


            }


            if ( prixBuy == 0 || isNaN(prixBuy) || (prixBuy == "")) {
              document.querySelector('.alertRes').innerHTML = `
              <div class="alert alert-danger alert-dismissible fade show  mx-auto mt-4" role="alert">
               Enter a valid Price of buying
                <a type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
               </div>
              `
              return;
            }
    
    
    
    
           if (codeBar2 != '') {
    
    
             if (isNaN(codeBar2)) {
               return(
                document.querySelector('.alertRes').innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show  mx-auto mt-4" role="alert">
                 Enter a valid CodeBar
                  <a type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
                 </div>
                `
               );
             }
           }


            if ((img2.files[0])) {



                if (img2.files[0].size / 1024 / 1024 > 2) {

                    document.querySelector('.alertRes').innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show mx-auto mt-4" role="alert">
                Please Use image less than 2MB
                  <a type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
                 </div>
                `
                    return;

                }

            }


            if ((label2 == MyData['label']) && (prix2 == MyData['prix']) && (stock2 == MyData['stock']) && !img2.files[0]) {

              if (Number(prixBuy) == Number(MyData['BuyingPrice']) ) {


           if (codeBar2 != '') {
             if (codeBar2 == MyData['CodeBare']) {
              document.querySelector('.alertRes').innerHTML = `
              <div class="alert alert-danger alert-dismissible fade show  mx-auto mt-4" role="alert">
               No change detected
                <a type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
               </div>
              `
              return;
             }
           }else{
             if (MyData['CodeBare']==null) {
              document.querySelector('.alertRes').innerHTML = `
              <div class="alert alert-danger alert-dismissible fade show  mx-auto mt-4" role="alert">
               No change detected
                <a type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
               </div>
              `
                  return;
             }

           }



              }

         
            } 






                // MyForm.submit()
                var formData = new FormData(MyForm);
          
                $.ajax({
                    url: `edit.php?editId=${editId}`,
                    type: 'POST',
                    data: formData,
                    success: function (data) {
                      if (data=="NoConnect") {
                        logout()
                        return;
                      }
                      console.log(data)
                      document.getElementById('prix').value = ''
                      document.getElementById('label').value = ''
                      document.getElementById('stock').value = ''
                      document.getElementById('prixofBuying').value =''
                      document.getElementById('codebar').value=''
                      document.getElementById('fileToUpload').value = ''
                      document.getElementById('offcanvasRight').style = 'visibility: hidden;'
                      document.querySelector('.modal-backdrop').classList.remove('show')
                      document.querySelector('.alertRes2').innerHTML = `
    <div class="alert alert-success alert-dismissible fade show  mx-auto mt-4 w-25" role="alert">
    Edit Succes
      <a type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
     </div>
    `
    cancelAllEdit()
                      editIfClicked = false
                      FetchAll()
                      affichage()
                    },
                    cache: false,
                    contentType: false,
                    processData: false
                });
            }




    })


                  
                    document.addEventListener('click',(e)=>{
                      if (!document.querySelector('.offcanvas ').contains(e.target)) {
                        cancelAllEdit()
                      }
                    })
          

}






document.getElementById('cancelEdit').addEventListener('click', () => {
  cancelAllEdit()

})


function cancelAllEdit() {
  if (editIfClicked == true) {
    
  document.getElementById('editBtn').value = 'Save'
  document.getElementById('editBtn').id = 'SaveBtn'
  document.getElementById('cancelEdit').removeAttribute('class')
  document.getElementById('cancelEdit').style = 'display:none'
  document.getElementById('nameP').textContent = 'Name of Product'
  document.getElementById('prixP').textContent = 'Price of Product'


  document.getElementById('MyForm').removeAttribute('action')
  document.getElementById('MyForm').setAttribute('action', 'add.php')
  document.getElementById('label').value = null
  document.getElementById('prix').value = null
  document.getElementById('stock').value = null
  document.getElementById('prixofBuying').value =null
  document.getElementById('codebar').value=null
  var formData = new FormData(document.getElementById('MyForm'));
  document.getElementById('fileToUpload').value = null

  editIfClicked = false
  MyData = undefined
}
}


let prix
let prixBuying
let label
let stock
let img
let codeBar


document.getElementById('SaveBtn').addEventListener('click', (e) => {

    e.preventDefault();

    if (editIfClicked == false) {


    // if (MyData == undefined) {
        let MyForm = document.getElementById('MyForm')
        prix = document.getElementById('prix').value
        prixBuying = document.getElementById('prixofBuying').value
        label = document.getElementById('label').value
        stock = document.getElementById('stock').value
        img = document.getElementById('fileToUpload')
        codeBar = document.getElementById('codebar').value


        if ((label == "") && (prix == "") && (!img.files[0]) && (stock == "")) {

            document.querySelector('.alertRes').innerHTML = `
             <div class="alert alert-danger alert-dismissible fade show mx-auto mt-4" role="alert">
             All fields are required
             <a type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
             </div>
              `
            return;

        }

        if ( Number(prixBuying) > Number(prix)) {
          return(
            document.querySelector('.alertRes').innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show mx-auto mt-4" role="alert">
             Enter a valid Buying Price
              <a type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
             </div>`
          );
        }





        if (isNaN(prix) || isNaN(stock)) {

            document.querySelector('.alertRes').innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show  mx-auto mt-4" role="alert">
             Please enter a valid number
              <a type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
             </div>
            `

            return;


        }

        if ((label == "") || (prix == "") || (!img.files[0]) || (stock == "")) {
             
            document.querySelector('.alertRes').innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show mx-auto mt-4" role="alert">
             All fields are required3
              <a type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
             </div>`

            return;

        }


        if ( prix == 0 ) {

            document.querySelector('.alertRes').innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show  mx-auto mt-4" role="alert">
             Price can't set to zero
              <a type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
             </div>
            `

            return;


        }


        if ( (prixBuying) == 0 || isNaN(prixBuying) || (prixBuying = "")) {
          document.querySelector('.alertRes').innerHTML = `
          <div class="alert alert-danger alert-dismissible fade show  mx-auto mt-4" role="alert">
           Enter a valid Price of buying
            <a type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
           </div>
          `
          return;
        }




       if (codeBar != '') {

        if (FetchAllDecode.some(product => product[8] === codeBar) == true) {
          document.querySelector('.alertRes').innerHTML = `
          <div class="alert alert-danger alert-dismissible fade show  mx-auto mt-4" role="alert">
           This Codebar is already regestred
            <a type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
           </div>
          `
          return;
         }

         if (isNaN(codeBar)) {
           return(
            document.querySelector('.alertRes').innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show  mx-auto mt-4" role="alert">
             Enter a valid CodeBar
              <a type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
             </div>
            `
           );
         }
       }


        if (img.files[0].size / 1024 / 1024 > 2) {

            document.querySelector('.alertRes').innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show  mx-auto mt-4" role="alert">
            Please Use image less than 2MB
              <a type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
             </div>
            `
          return;

        } 
       
              var formData = new FormData(document.getElementById('MyForm'));
          
              $.ajax({
                  url: 'add.php',
                  type: 'POST',
                  data: formData,
                  success: function (data) {
                    if (data=="NoConnect") {
                      logout()
                      return;
                    }
                    document.getElementById('prix').value = ''
                    document.getElementById('prixofBuying').value = ''
                    document.getElementById('label').value = ''
                    document.getElementById('stock').value = ''
                    document.getElementById('fileToUpload').value = ''
                    document.getElementById('codebar').value = ''
                    document.getElementById('offcanvasRight').style = 'visibility: hidden;'
                    document.querySelector('.modal-backdrop').classList.remove('show')
                    FetchAll()
                    affichage()
                  },
                  cache: false,
                  contentType: false,
                  processData: false
              });
       

      

            }
})


// =============== Statistique of Product Feature ===============

const ProductStatistics = ()=>{

  document.querySelectorAll('.productStatistics').forEach(element=>{
    element.addEventListener('click',(e)=>{
      let ourProduit = e.target
      let ourProduitId = ourProduit.getAttribute('productid')
      console.log(ourProduitId)
      FetchAllDecode.forEach(element=>{
        if (element[0] == ourProduitId) {
          console.log(`product was found he was buyed ${element[6]} and he was earned ${element[7]}`)
          document.getElementById('StatisticsModalLabel').innerHTML = `"${element[1]}" Statistics`;
          document.getElementById('StatisticsNumberBuyed').innerHTML = `${element[6]} Time`;
          document.getElementById('StatisticsEarningsProduct').innerHTML = `${element[7]} DH`;
        }
      })
    })
  })

}

// ------------------------------ End ------------------------------


document.getElementById('addPToogle').addEventListener('click',()=>{
  document.addEventListener('click',(e)=>{

    if (!document.querySelector('.offcanvas ').contains(e.target)) {
      document.getElementById('prix').value = ''
      document.getElementById('prixofBuying').value = ''
      document.getElementById('label').value = ''
      document.getElementById('stock').value = ''
      document.getElementById('fileToUpload').value = ''

    }
  })

  
})



let searchParams = new URLSearchParams(window.location.search)
if (searchParams.get('editSucces') == 'true') {
    document.querySelector('.alertRes').innerHTML = `
    <div class="alert alert-success alert-dismissible fade show  mx-auto mt-4" role="alert">
    Edit Succes
      <a type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
     </div>
    `
}



function toogleMinus() {


    document.querySelectorAll(".toogleMinus").forEach(element => {
        element.addEventListener('click', () => {

            let closestDiv = element.closest('div')
            closestDiv.querySelector('.alertZoneMinus').innerHTML = ""

            closestDiv.querySelector('.myPopup').classList.toggle("show");

            let detector = closestDiv.querySelector('.myPopup')

            document.addEventListener('click', (e) => {
                if ((element != e.target) && (!detector.contains(e.target))) {
                    closestDiv.querySelector('.myPopup').classList.remove("show");
                    closestDiv.querySelector('.alertZoneMinus').innerHTML = ""

                }
            })

        })
    })
}



function stockMinus() {


    document.querySelectorAll('.saveMinus').forEach(element => {



        element.addEventListener("click", (e) => {

            var detectInputCon = element.closest('span')
            var detectInput = detectInputCon.querySelector('.stockMinus').value
            let alertZoneMinus = detectInputCon.querySelector('.alertZoneMinus')


            let detectStockNumElement = element.closest('td')

            detectStockNumber = detectStockNumElement.querySelector('.DetectCurrentStock').textContent



            if (!isNaN(detectInput) && detectInput >= 0 && detectInput != "") {

                if (detectStockNumber - detectInput >= 0) {

                    alertZoneMinus.innerHTML = ""

                    $.ajax({
                        url: 'decStock.php',
                        type: 'post',
                        data: {
                            'editId': element.value,
                            'decStock': detectInput,
                        },
                        dataType: 'json',
                        success: function (data) {
                          if (data=="NoConnect") {
                            logout()
                            return;
                          }
                            if (data.res == 1) {

                                let stockAlert = element.closest('tr').querySelectorAll('td')[1]

                                detectInputCon.classList.remove('show')
                                FetchAll()

                                if (data.newStock == 0) {

                                    if (stockAlert.querySelector('.badge')) {
                                        stockAlert.querySelector('.badge').remove()
                                    }

                                    stockAlert.innerHTML +=
                                        ` <span class="badge bg-danger" style='color: #3427b0;background-color:#fff!important'>Out Stock</span>`

                                } else if (data.newStock <= 10) {

                                    if (stockAlert.querySelector('.badge')) {
                                        stockAlert.querySelector('.badge').remove()
                                    }

                                    stockAlert.innerHTML +=
                                        ` <span class="badge bg-warning " style='color: #3427b0;background-color:#fff!important'>Will End Soon</span>`
                                }



                                detectInput = ""
                                element.closest('span').querySelector('.stockMinus').value = ""
                                detectStockNumElement.querySelector('.DetectCurrentStock').textContent = data.newStock


                            }
                        }
                    })

                } else {
                    alertZoneMinus.innerHTML = `<br> Haven't Enagh Stock`
                }



            } else {
                alertZoneMinus.innerHTML = `<br> valid number required`
            }


        })

    })

}



function tooglePlus() {


    document.querySelectorAll(".tooglePlus").forEach(element => {
        element.addEventListener('click', () => {

            let closestDiv = element.closest('div')
            closestDiv.querySelector('.alertZonePlus').innerHTML = ""

            closestDiv.querySelector('.myPopup2').classList.toggle("show2");

            let detector = closestDiv.querySelector('.myPopup2')

            document.addEventListener('click', (e) => {
                if ((element != e.target) && (!detector.contains(e.target))) {
                    closestDiv.querySelector('.myPopup2').classList.remove("show2");
                    closestDiv.querySelector('.alertZonePlus').innerHTML = ""

                }
            })

        })
    })
}



function stockPlus() {


    document.querySelectorAll('.savePlus').forEach(element => {



        element.addEventListener("click", () => {
            let stockAlert = element.closest('tr').querySelectorAll('td')[1]
            let detectInputCon = element.closest('span')
            let detectInput = detectInputCon.querySelector('.stockPlus').value
            let alertZonePlus = detectInputCon.querySelector('.alertZonePlus')


            let detectStockNumElement = element.closest('td')

            detectStockNumber = detectStockNumElement.querySelector('.DetectCurrentStock').textContent



            if (!isNaN(detectInput) && detectInput >= 0 && detectInput != "") {



                alertZonePlus.innerHTML = ""

                $.ajax({
                    url: 'croiStock.php',
                    type: 'post',
                    data: {
                        'editId': element.value,
                        'croiStock': detectInput,
                    },
                    dataType: 'json',
                    success: function (data) {
                      if (data=="NoConnect") {
                        logout()
                        return;
                      }
                        if (data.res == 1) {
                            detectInputCon.classList.remove('show2')
                            FetchAll()
                            if (data.newStock > 10) {
                                if (stockAlert.querySelector('.badge')) {
                                    stockAlert.querySelector('.badge').remove()
                                }

                            }

                            if (data.newStock != 0 && data.newStock <= 10) {

                                if (stockAlert.querySelector('.badge')) {
                                    stockAlert.querySelector('.badge').remove()
                                }

                                stockAlert.innerHTML +=
                                    ` <span class="badge bg-warning " style='color: #3427b0;background-color:#fff!important'>Will End Soon</span>`
                            }



                            detectInput = ""
                            element.closest('span').querySelector('.stockPlus').value = ""
                            detectStockNumElement.querySelector('.DetectCurrentStock').textContent = data.newStock
                        }
                    }
                })

            } else {
                alertZonePlus.innerHTML = "valid number required"
            }


        })

    })

}



// Add to NewClient Cart

function toogleAddCart() {


    document.querySelectorAll(".toogleAddCart").forEach(element => {
        element.addEventListener('click', () => {

            let closestDiv = element.closest('div')
            closestDiv.querySelector('.alertZoneAddCart').innerHTML = ""

            closestDiv.querySelector('.myPopupAddCart').classList.toggle("showAddCart");
            closestDiv.querySelector('.myPopupAddCart').querySelector('.stockAddCart').value = "1"
            closestDiv.querySelector('.myPopupAddCart').querySelector('.stockAddCart').select()
            let detector = closestDiv.querySelector('.myPopupAddCart')

            document.addEventListener('click', (e) => {
                if ((element != e.target) && (!detector.contains(e.target))) {
                    closestDiv.querySelector('.myPopupAddCart').classList.remove("showAddCart");
                    closestDiv.querySelector('.myPopupAddCart').querySelector('.stockAddCart').value = "1"
                    closestDiv.querySelector('.alertZoneAddCart').innerHTML = ""

                }
            })

        })
    })
}






function tooglePlus() {


    document.querySelectorAll(".tooglePlus").forEach(element => {
        element.addEventListener('click', () => {

            let closestDiv = element.closest('div')
            closestDiv.querySelector('.alertZonePlus').innerHTML = ""

            closestDiv.querySelector('.myPopup2').classList.toggle("show2");

            let detector = closestDiv.querySelector('.myPopup2')

            document.addEventListener('click', (e) => {
                if ((element != e.target) && (!detector.contains(e.target))) {
                    closestDiv.querySelector('.myPopup2').classList.remove("show2");
                    closestDiv.querySelector('.alertZonePlus').innerHTML = ""

                }
            })

        })
    })
}



let AllowScan = false

// ================= Cancel Cart/Toogle Cart Off/On =====================

// Also Cancel Cart with Keys
document.onkeydown = (e) => {


  if (e.code == "ControlLeft") {
    
    document.querySelector('.order_summary').classList.toggle("ShowHideCart");
  }

  if (e.code == "ControlRight") {
    
    NewClientCancel()
  }


  if (e.code == "AltLeft") {
  e.preventDefault()
    document.getElementById('search').value = ''
    document.getElementById('search').focus()
    affichage()
  }
  
  if (e.code == "F1") {
  e.preventDefault()

    if (AllowScan == false) {
      AllowScan = true
      document.querySelector('input[type=checkbox]').checked = true
      
    }else{
      AllowScan = false
      document.querySelector('input[type=checkbox]').checked = false
    }

    // document.getElementById('searchPos').focus()
    
  }
  
  if (e.code == "ShiftLeft") {
    console.log('yoo')
    document.getElementById('searchPos').value = ''
    document.getElementById('searchPos').focus()
    affichage()
  }
 

  // if (e.key.toLowerCase() >= 65 && e.key.toLowerCase() <= 90) {
  //   if (AllowScan == true) {
  //     console.log('wooooooooooooooooooooooow')
  //     AllowScan = false
  //   }
  // }


  
}

document.querySelector('input[type=checkbox]').addEventListener('change',()=>{
  if (document.querySelector('input[type=checkbox]').checked == true) {
    AllowScan = true
  }else{
    AllowScan = false
  }
})


document.addEventListener('click', (e) => {

  // if (condition) {
  if ( (document.getElementById('newClientCart') != e.target) && (!document.querySelector('.order_summary').contains(e.target))) {
    
    if (document.querySelector('.order_summary').hasAttribute('removethis') != true){ 

      if (click_plus_minus_cart != true) {

      document.querySelector('.order_summary').classList.remove("ShowHideCart");
      // document.querySelector('.order_summary').removeAttribute('removethis')


    
 
  }else{
    click_plus_minus_cart = false;
  }


   
  }else{
    document.querySelector('.order_summary').removeAttribute('removethis')
  }
}
// }
})


document.getElementById('newClientCart').addEventListener('click', () => {
  
  document.querySelector('.order_summary').classList.toggle("ShowHideCart") 
 
})


// ------------------------------  End of Toogle Cart -----------------------



function RemoveAddedP() {
  let detectEl = 0
  document.querySelectorAll('.removeItem').forEach(element=>{


    element.onclick = ()=> {
      document.querySelector('.order_summary').setAttribute('removethis','true')
      detectEl=0
     let elementId =  element.getAttribute('getremoveid')

     ProductsList.forEach(element=>{
       if (element.id == elementId) {
        ProductsList.splice(detectEl,1)
        console.log(ProductsList)
       }
       detectEl++
     })
     
       TotalAmount = 0
       numsOfPCart = 0
    ProductsList.forEach(element=>{
      TotalAmount += element.priceFinal
      numsOfPCart += element.quantity
    })
     element.closest('.card_item').remove()

if (!document.querySelector('.card_item')) {
  document.querySelector('.order_summary').innerHTML = `
  <div class="summary_card">
  <div class="allProductsCart" style="max-height: 300px; overflow: auto;">
    
  </div>
  <div class="priceZone">
        <hr />
  
        <div class="order_total">
          <p>Total Amount</p>
          <h4 class="tp"></h4>
        </div>
  
        <div class="save" style="margin-bottom: 10px;
        margin-top: -14px;
        display: flex;
        justify-content: flex-end;">
  
        </div>
  
  </div>
      </div>`
      document.getElementById('numCartP').innerHTML = ''


}else{
  document.querySelector('.tp').innerHTML = `${TotalAmount.toFixed(2)} DH`
  document.getElementById('numCartP').innerHTML = numsOfPCart
}


 
   
    }
  })

  


}




let numsOfPCart = 0 

// Add Product To Cart
let ProductsList = []
let TotalAmount = 0
let clientEarnings = 0
let SameProduct = false
function AddProductReal() {

 
  document.querySelectorAll('.saveAddCart').forEach(element=>{
    element.addEventListener('click',()=>{


      let addedTR = element.closest('tr')
      let closestDiv = element.closest('div')

      let addedInputSpan = element.closest('span')

      if (addedInputSpan.querySelector('.stockAddCart').value == "" ||
      isNaN(addedInputSpan.querySelector('.stockAddCart').value) == true ||
      addedInputSpan.querySelector('.stockAddCart').value <= 0
      ) {
        closestDiv.querySelector('.alertZoneAddCart').innerHTML = "valid number required"
       
        return;
      }

      if (Number(addedTR.querySelector('.DetectCurrentStock').textContent) < 
            Number(addedInputSpan.querySelector('.stockAddCart').value) ) {

        closestDiv.querySelector('.alertZoneAddCart').innerHTML = "haven't enagh stock"

        return;
      }

      let AddedProductData = {
         id : element.value,
         label : addedTR.querySelector('.nameProduit').textContent,
         price : Number(addedTR.querySelector('.priceProd').textContent),
         quantity : Number(addedInputSpan.querySelector('.stockAddCart').value),
         stock : Number(addedTR.querySelector('.DetectCurrentStock').textContent),
         imgSource : addedTR.querySelector('.productImage').getAttribute('src'),
         priceFinal : Number(addedTR.querySelector('.priceProd').textContent) * 
                      Number(addedInputSpan.querySelector('.stockAddCart').value),
    }

    FetchAllDecode.forEach(element=>{
      if (AddedProductData.id == element[0]) {
        AddedProductData.priceBuying = Number(element[5])
        AddedProductData.productEarnings = (AddedProductData.price - AddedProductData.priceBuying) * AddedProductData.quantity
        console.log(AddedProductData)
      }
    })
    
    ProductsList.forEach(element=>{
      if (element.id == AddedProductData.id) {
        if (( Number(element.quantity) + Number(AddedProductData.quantity) ) <=
        Number(addedTR.querySelector('.DetectCurrentStock').textContent)
        ) {
          element.quantity = Number(element.quantity) + Number(AddedProductData.quantity);

        }else{
          // element.quantity = Number(addedTR.querySelector('.DetectCurrentStock').textContent)
          closestDiv.querySelector('.alertZoneAddCart').innerHTML = 
          `haven't enagh stock You have been added ${Number(element.quantity)} 
          and you have just ${Number(addedTR.querySelector('.DetectCurrentStock').textContent)} in Stock`
          SameProduct = true
          return;
        }
        
        element.priceFinal = Number(element.price) * Number(element.quantity)
        element.productEarnings = Number(AddedProductData.productEarnings) + 
                                  Number(element.productEarnings)

        numsOfPCart = 0
        TotalAmount = 0
        clientEarnings = 0
        ProductsList.forEach(element=>{
          TotalAmount += element.priceFinal
          clientEarnings += element.productEarnings
          numsOfPCart += element.quantity

        })
        

        document.querySelector('.allProductsCart').innerHTML =""
        ProductsList.forEach(element=>{
          document.querySelector('.allProductsCart').innerHTML += `
  
          <div class="card_item">
          <div class="product_img">
            <img src=${element.imgSource} alt="" /> 
          </div>
          <div class="product_info">
            <div class="LabelRemove">
              <h1>${element.label}</h1>
              <span class="removeItem" getremoveid=${element.id}>X</span>
        </div>
            <div class="product_rate_info">
              <h1>${element.price}</h1>
              <span>
              <button type='btn' class="pqt-minus" minusCartId='${element.id}'>-</button>
              <span class="pqt">${element.quantity}</span>
          </span>
            </div>
          </div>
        </div>`
       
       
          document.querySelector('.tp').innerHTML = `${TotalAmount.toFixed(2)} DH`
          document.querySelector('.save').innerHTML = `
          <button onclick='NewClientCancel()' class='btn cancelClient' style='margin: 0 15px;'>Cancel</button>
          <button onclick='NewClientSave()' class='btn saveClient' style='margin: 0 10px;'>Save</button>
          `

          document.getElementById('numCartP').innerHTML = numsOfPCart

        })
        closestDiv.querySelector('.myPopupAddCart').classList.remove("showAddCart");
        SameProduct = true
        RemoveAddedP()
        MinusAddedP()
        PlusAddedP(Number(addedTR.querySelector('.DetectCurrentStock').textContent))
        
      }
    })


if (SameProduct == false) {
  

    ProductsList.push(AddedProductData)
    console.log(ProductsList)
    numsOfPCart = 0
    TotalAmount = 0
    clientEarnings = 0
    ProductsList.forEach(element=>{
      TotalAmount += element.priceFinal
      clientEarnings += element.productEarnings
      numsOfPCart += element.quantity
    })
    
 
   document.querySelector('.allProductsCart').innerHTML += `

   <div class="card_item">
   <div class="product_img">
     <img src=${AddedProductData.imgSource} alt="" /> 
   </div>
   <div class="product_info">
     <div class="LabelRemove">
       <h1>${AddedProductData.label}</h1>
       <span class="removeItem" getremoveid=${AddedProductData.id}>X</span>
 </div>
     <div class="product_rate_info">
       <h1>${AddedProductData.price}</h1>
       <span>
       <button class="pqt-minus" minusCartId='${AddedProductData.id}'>-</button>
       <span class="pqt">${AddedProductData.quantity} </span>
       <button class="pqt-plus" plusCartId='${AddedProductData.id}'>+</button>
   </span>
     </div>

   </div>
 </div>`


 closestDiv.querySelector('.myPopupAddCart').classList.remove("showAddCart");


   document.querySelector('.tp').innerHTML = `${TotalAmount.toFixed(2)} DH`
   document.querySelector('.save').innerHTML = `
   <button onclick='NewClientCancel()' class='btn cancelClient' style='margin: 0 15px;'>Cancel</button>
   <button onclick='NewClientSave()' class='btn saveClient' style='margin: 0 10px;'>Save</button>
   `
   document.getElementById('numCartP').innerHTML = numsOfPCart


   RemoveAddedP()
   MinusAddedP()
   PlusAddedP(Number(addedTR.querySelector('.DetectCurrentStock').textContent))
  }else{
    SameProduct = false
  }

    })
  })
}



//=================== Plus/Minus Inside Cart =================

function MinusAddedP() {
  
document.querySelectorAll('.pqt-minus').forEach(element=>{


  element.onclick = ()=> {
    // document.querySelector('.order_summary').setAttribute('style','display:block')
   click_plus_minus_cart = true
   let elementId = element.getAttribute('minuscartid')

   ProductsList.forEach(element=>{

     if (element.id == elementId) {

      if ( element.quantity - 1 >= 1 ) {
     
     element.quantity = element.quantity - 1
     element.priceFinal = element.price * element.quantity
      console.log(ProductsList)

      TotalAmount = 0
      numsOfPCart = 0
      ProductsList.forEach(element=>{
        TotalAmount += element.priceFinal
        numsOfPCart += element.quantity
      })

      

      document.querySelector('.allProductsCart').innerHTML =""
      ProductsList.forEach(element=>{
        document.querySelector('.allProductsCart').innerHTML += `

        <div class="card_item">
        <div class="product_img">
          <img src=${element.imgSource} alt="" /> 
        </div>
        <div class="product_info">
          <div class="LabelRemove">
            <h1>${element.label}</h1>
            <span class="removeItem" getremoveid=${element.id}>X</span>
      </div>
          <div class="product_rate_info">
            <h1>${element.price}</h1>
            <span>
            <button type='btn' class="pqt-minus" minusCartId='${element.id}'>-</button>
            <span class="pqt">${element.quantity} </span>
            <button type='btn' class="pqt-plus" plusCartId='${element.id}'>+</button>
        </span>
          </div>
        </div>
      </div>`
     
     
        document.querySelector('.tp').innerHTML = `${TotalAmount.toFixed(2)} DH`
        document.querySelector('.save').innerHTML = `
        <button onclick='NewClientCancel()' class='btn cancelClient' style='margin: 0 15px;'>Cancel</button>
        <button onclick='NewClientSave()' class='btn saveClient' style='margin: 0 10px;'>Save</button>
        `
        document.getElementById('numCartP').innerHTML = numsOfPCart

      })


     }else{
      console.log('The minimum Quantity is 1')
    }

    }

   })
   
  //  document.querySelector('.order_summary').removeAttribute('removethis')

  
  MinusAddedP()
  PlusAddedP()
  RemoveAddedP()
 
  

  }
})

}



function PlusAddedP() {
  
  document.querySelectorAll('.pqt-plus').forEach(element=>{
  
  
    element.onclick = ()=> {
      // document.querySelector('.order_summary').setAttribute('style','display:block')
     click_plus_minus_cart = true
     let elementId =  element.getAttribute('plusCartId')
  
     ProductsList.forEach(element=>{
  
       if (element.id == elementId) {
  
        if ( element.quantity  < element.stock ) {
       
       element.quantity = Number(element.quantity) + 1
       element.priceFinal = element.price * element.quantity
        console.log(ProductsList)
  
        TotalAmount = 0
        numsOfPCart = 0
        ProductsList.forEach(element=>{
          TotalAmount += element.priceFinal
          numsOfPCart += element.quantity
        })
        document.querySelector('.allProductsCart').innerHTML =""
        ProductsList.forEach(element=>{
          document.querySelector('.allProductsCart').innerHTML += `
  
          <div class="card_item">
          <div class="product_img">
            <img src=${element.imgSource} alt="" /> 
          </div>
          <div class="product_info">
            <div class="LabelRemove">
              <h1>${element.label}</h1>
              <span class="removeItem" getremoveid=${element.id}>X</span>
        </div>
            <div class="product_rate_info">
              <h1>${element.price}</h1>
              <span>
              <button type='btn' class="pqt-minus" minusCartId='${element.id}'>-</button>
              <span class="pqt">${element.quantity} </span>
              <button type='btn' class="pqt-plus" plusCartId='${element.id}'>+</button>
          </span>
            </div>
          </div>
        </div>`
       
       
          document.querySelector('.tp').innerHTML = `${TotalAmount.toFixed(2)} DH`
          document.querySelector('.save').innerHTML = `
          <button onclick='NewClientCancel()' class='btn cancelClient' style='margin: 0 15px;'>Cancel</button>
          <button onclick='NewClientSave()' class='btn saveClient' style='margin: 0 10px;'>Save</button>
          `

          document.getElementById('numCartP').innerHTML = numsOfPCart


        })
  
  
       }else{
        console.log("Haven't enagh Stock")
      }
  
      }
  
     })
     
    //  document.querySelector('.order_summary').removeAttribute('removethis')
  
    
    MinusAddedP()
    PlusAddedP()
    RemoveAddedP()
   
    
  
    }
  })
  
  }


  // ---------------------------------- END --------------------


// ================== Save Cart To Client ======================

function NewClientSave() {
  


  if (!ProductsList.length) return;

  document.querySelector('.saveClient').removeAttribute('onclick')

  $.ajax({
    url: 'NewClient.php',
    type: 'post',
    data: {
        'clientCart' : JSON.stringify(ProductsList),
        'totall' : TotalAmount,
        'clientEarnings' : clientEarnings,
    },
    dataType: 'json',
    success: function (data) {
      console.log(data)
      if (data=="NoConnect") {
        logout()
        return;
      }
      if (data.res == 1){
       
        if (AllowScan) {
          print()
        }
      
      document.querySelector('.saveClient').setAttribute('onclick','NewClientSave()')
      document.querySelector('.order_summary').classList.remove("ShowHideCart")     
      console.log(data)
      ProductsList = []
      TotalAmount = 0
      clientEarnings = 0
      document.querySelector('.order_summary').innerHTML = `
      <div class="summary_card">
      <div class="allProductsCart" style="max-height: 300px; overflow: auto;">
        
      </div>
      <div class="priceZone">
            <hr />
      
            <div class="order_total">
              <p>Total Amount</p>
              <h4 class="tp"></h4>
            </div>
      
            <div class="save" style="margin-bottom: 10px;
            margin-top: -14px;
            display: flex;
            justify-content: flex-end;">
      
            </div>
      
      </div>
          </div>`

          document.getElementById('numCartP').innerHTML = ''


      FetchAll()
      affichage()

    }
    }
  })


}

const print = () =>{
  let bb = [
    {
      "text": "Quantity",
      "nodeName": "TH",
      "bold": true,
      "fillColor": "#EEEEEE",
      "width": 53,
      "style": [
        "html-th",
        "html-tr",
        "html-tbody",
        "html-table",
        "html-div"
      ]
    },
    {
      "text": "Products",
      "nodeName": "TH",
      "bold": true,
      "fillColor": "#EEEEEE",
      "width": 113,
      "style": [
        "html-th",
        "html-tr",
        "html-tbody",
        "html-table",
        "html-div"
      ]
    },
    {
      "text": "Prix of Product",
      "nodeName": "TH",
      "bold": true,
      "fillColor": "#EEEEEE",
      "width": 113,
      "style": [
        "html-th",
        "html-tr",
        "html-tbody",
        "html-table",
        "html-div"
      ]
    },
    {
      "text": "Quantity * price",
      "nodeName": "TH",
      "bold": true,
      "fillColor": "#EEEEEE",
      "width": 113,
      "style": [
        "html-th",
        "html-tr",
        "html-tbody",
        "html-table",
        "html-div"
      ]
    },
  ]

  let lastPr =  [
    {
      "text": "",
      "nodeName": "TD",
      "height": 19,
      "alignment": "center",
      "border": [
        false,
        false,
        false,
        false
      ],
      layout: 'noBorders',
      "style": [
        "html-td",
        "html-tr",
        "html-tbody",
        "html-table",
        "html-div"
      ]
    },
    {
      "text": "",
      "nodeName": "TD",
      "height": 19,
      "alignment": "center",
      "border": [
        false,
        false,
        false,
        false
      ],
      layout: 'noBorders',

      "style": [
        "html-td",
        "html-tr",
        "html-tbody",
        "html-table",
        "html-div"
      ]
    },
    {
      "text": "Total :",
      "nodeName": "TD",
      "height": 19,
      "alignment": "center",
      "border": [
        false,
        false,
        false,
        false
      ],
      layout: 'noBorders',

      "style": [
        "html-td",
        "html-tr",
        "html-tbody",
        "html-table",
        "html-div"
      ]
    },
    {
      "text": `${TotalAmount.toString()} DH`,
      "nodeName": "TD",
      "height": 19,
      "alignment": "center",
      "style": [
        "html-td",
        "html-tr",
        "html-tbody",
        "html-table",
        "html-div"
      ]
    },
    
  ]
  

let allFacture =  ProductsList.map(el=>{return(
    [
      {
        "text": (el.quantity).toString(),
        "nodeName": "TD",
        "height": 38,
        "alignment": "center",
        "style": [
          "html-td",
          "html-tr",
          "html-tbody",
          "html-table",
          "html-div"
        ]
      },
      {
        "text": el.label,
        "nodeName": "TD",
        "height": 38,
        "alignment": "center",
        "style": [
          "html-td",
          "html-tr",
          "html-tbody",
          "html-table",
          "html-div"
        ]
      },
      {
        "text": `${(el.price).toString()} DH` ,
        "nodeName": "TD",
        "height": 38,
        "alignment": "center",
        "style": [
          "html-td",
          "html-tr",
          "html-tbody",
          "html-table",
          "html-div"
        ]
      },
      {
        "text": `${(el.priceFinal).toString()} DH` ,
        "nodeName": "TD",
        "height": 38,
        "alignment": "center",
        "style": [
          "html-td",
          "html-tr",
          "html-tbody",
          "html-table",
          "html-div"
        ]
      },
    ]
  )})

  allFacture.unshift(bb)
  allFacture.push(lastPr)

  var dd = {



    
    "content": [
      {
        "nodeName": "DIV",
        "stack": [
          {
            "text": [
              {
                "text": "Welcome To Hassan Market",
                "nodeName": "STRONG",
                "bold": true,
                "style": [
                  "html-strong",
                  "html-p",
                  "html-div"
                ]
              }
            ],
            "nodeName": "P",
            "margin": [
              0,
              5,
              0,
              10
            ],
            "style": [
              "html-p",
              "html-div"
            ]
          },
          {
            "text": "Your order information :",
            "nodeName": "P",
            "margin": [
              0,
              5,
              0,
              10
            ],
            "style": [
              "html-p",
              "html-div"
            ]
          },
          {
            "nodeName": "TABLE",
            "marginBottom": 5,
            "style": [
              "html-table",
              "html-div"
            ],
            "table": {
              "body": allFacture,
              "widths": [
                53,
                113,
                113,
                113
              ],
              "heights": [
                "auto",
                38,
                38
              ]
            },
            layout: 'lightHorizontalLines'
          },
          {
            "text": "Thanks for your visit",
            "nodeName": "SPAN",
            "style": [
              "html-span",
              "html-div",
              "green"
            ]
          }
        ]
      }
    ],
    "styles": {
      "green": {
        "color": "green"
      }
    }
  }
  
  pdfMake.createPdf(dd).print();
}

function NewClientCancel() {


      ProductsList = []
      document.querySelector('.order_summary').innerHTML = `
      <div class="summary_card">
      <div class="allProductsCart" style="max-height: 300px; overflow: auto;">
        
      </div>
      <div class="priceZone">
            <hr />
      
            <div class="order_total">
              <p>Total Amount</p>
              <h4 class="tp"></h4>
            </div>
      
            <div class="save" style="margin-bottom: 10px;
            margin-top: -14px;
            display: flex;
            justify-content: flex-end;">
      
            </div>
      
      </div>
          </div>`

      document.querySelector('.order_summary').classList.remove("ShowHideCart")     

      document.getElementById('numCartP').innerHTML = ''



 
}

// ------------------ End -----------------------------------


//    ==================== SEARCH PRODUCT =============



document.getElementById('search').addEventListener('input', () => {    
 

    if (document.getElementById('search').value == "") {
        affichage()
        //  document.querySelectorAll('.TrToHideSearch').forEach(element => {
        //         element.style = 'display:table-row'
        //     })

        return;
        
    }

    if (document.querySelector('.searchRes')) {
        document.querySelectorAll('.searchRes').forEach(element => {
            element.remove()
            // document.querySelectorAll('.TrToHideSearch').forEach(element => {
            //     element.style = 'display:table-row'
            // })
        })
        // affichage()
    }

    var getSearch = document.getElementById('search').value;

    getSearch = getSearch.toLowerCase()

    let SerachArray = []

    if (document.getElementById('search').value != "") {

        FetchAllDecode.forEach(element => {
            var elementTextLower = element[1].toLowerCase()



            if (SerachArray.length < 5) {

                if (elementTextLower.includes(getSearch)) {
                    SerachArray.push(element)
                }

            }

        });

        // for (let index = 0; index < 5; index++) {
        if (SerachArray.length) {
            // if (document.querySelector('.coSearch').hasAttribute('style')) {

            document.querySelectorAll('.TrToHideSearch').forEach(element => {
                element.remove()
            })



            document.querySelector('.co').innerHTML = `<tr>
            <th style="text-align: center;">image</th>
            <th style="text-align: center;">label</th>
            <th style="text-align: center;">prix</th>
            <th style="text-align: center;">stock</th>
            <th style="text-align: center;">Operations</th>
            </tr>
            `

            // if (arrayWhere==AllData.length) return;

            SerachArray.forEach(element => {

                if (element[4] <= 10 && element[4] != 0) {
                    //    element[1] = `${element[1]} <span class="badge bg-warning text-dark">Will End Soon</span>`
                    if (NewClientRemamber == true) {


                        document.querySelector('.co').innerHTML +=
                            `
                        <tr class='searchRes'>
                        <td><img class='productImage' style='width:100px' src='images/${element[3]}'></td>
                
                        <td><span class='nameProduit'>${element[1]}</span> <span class="badge bg-warning" style='color: #3427b0;background-color:#fff!important'>Will End Soon</span></td>
                        <td class='priceProd'>${element[2]}</td>
                        <td><span class='DetectCurrentStock'>${element[4]}</span><br>
                        
                        <div class="popup">
                        <i class="toogleMinus ri-checkbox-indeterminate-fill"></i>
                       
                        <span class="popuptext myPopup" >
                          <input class="stockMinus" type="text" placeholder="Quntity" style='width: 60px;'>
                          <button class="saveMinus btn btn-primary" value='${element[0]}'>save</button>
                          <span class='alertZoneMinus' style='color:red; font-size:15px'></span>
                        </span>
                      </div>
                
                
                      <div class="popup2">
                      <i class='tooglePlus ri-add-box-fill'></i>
                      <span class="popuptext2 myPopup2">
                        <input class="stockPlus" type="text" placeholder="Quntity" style='width: 60px;'>
                        <button class="savePlus btn btn-primary" value='${element[0]}'>save</button>
                        <span class='alertZonePlus' style='color:red; font-size:15px'></span>
                      </span>
                    </div>
                
                
                        </td>
                        <td>
                        <i class="deleteThis ri-close-circle-line" value='${element[0]}'></i>
                        <i class="editThis ri-edit-2-fill" priceBuyingThis='${element[5]}' value='${element[0]}' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"></i>
                        <div class="popupAddCart" style='display : inline-block'>
                        <i productid='${element[0]}' class='toogleAddCart ri-shopping-cart-fill'></i>
                        <span class="popuptextAddCart myPopupAddCart">
                          <input class="stockAddCart" type="text" placeholder="Quntity" value='1' style='width: 60px;'>
                          <button class="saveAddCart btn" value='${element[0]}'>save</button>
                          <span class='alertZoneAddCart' style='color:red; font-size:15px'></span>
                        </span>
                      </div>
                      <div style='display : inline-block'><i class="ri-bar-chart-2-fill productStatistics" productid='${element[0]}' data-bs-toggle="modal" data-bs-target="#StatisticsModal"></i></div>
                        </td>
                        </tr>
                        `
                        deleteThis()
                        editThis()
                        ProductStatistics()
                        toogleMinus()
                        stockMinus()
                        tooglePlus()
                        stockPlus()
                        toogleAddCart()
                        AddProductReal();
                  
                        return;
                    }


                }

                if (element[4] == 0) {
                    // element[1] = `${element[1]} <span class="badge bg-danger" style='color:#fff'>Out Stock</span>`
                    if (NewClientRemamber == true) {


                        document.querySelector('.co').innerHTML +=
                            `
                        <tr  class='searchRes'>
                        <td><img class='productImage' style='width:100px' src='images/${element[3]}'></td>
                
                        <td><span class='nameProduit'>${element[1]}</span> <span class="badge bg-danger" style='color: #3427b0;background-color:#fff!important'>Out Stock</span></td>
                        <td class='priceProd'>${element[2]}</td>
                        <td><span class='DetectCurrentStock'>${element[4]}</span><br>
                        
                        <div class="popup">
                        <i class="toogleMinus ri-checkbox-indeterminate-fill"></i>
                       
                        <span class="popuptext myPopup" >
                          <input class="stockMinus" type="text" placeholder="Quntity" style='width: 60px;'>
                          <button class="saveMinus btn btn-primary" value='${element[0]}'>save</button>
                          <span class='alertZoneMinus' style='color:red; font-size:15px'></span>
                        </span>
                      </div>
                
                
                      <div class="popup2">
                      <i class='tooglePlus ri-add-box-fill'></i>
                      <span class="popuptext2 myPopup2">
                        <input class="stockPlus" type="text" placeholder="Quntity" style='width: 60px;'>
                        <button class="savePlus btn btn-primary" value='${element[0]}'>save</button>
                        <span class='alertZonePlus' style='color:red; font-size:15px'></span>
                      </span>
                    </div>
                
                
                        </td>
                        <td>
                        <i class="deleteThis ri-close-circle-line" value='${element[0]}'></i>
                        <i class="editThis ri-edit-2-fill" priceBuyingThis='${element[5]}' value='${element[0]}' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"></i>
                        <div class="popupAddCart" style='display : inline-block'>
                        <i productid='${element[0]}' class='toogleAddCart ri-shopping-cart-fill'></i>
                        <span class="popuptextAddCart myPopupAddCart">
                          <input class="stockAddCart" type="text" placeholder="Quntity" value='1' style='width: 60px;'>
                          <button class="saveAddCart btn" value='${element[0]}'>save</button>
                          <span class='alertZoneAddCart' style='color:red; font-size:15px'></span>
                        </span>
                      </div>
                      <div style='display : inline-block'><i class="ri-bar-chart-2-fill productStatistics" productid='${element[0]}' data-bs-toggle="modal" data-bs-target="#StatisticsModal"></i></div>
                        </td>
                        </tr>
                        `

                        deleteThis()
                        editThis()
                        ProductStatistics()
                        toogleMinus()
                        stockMinus()
                        tooglePlus()
                        stockPlus()
                        toogleAddCart()
                        AddProductReal();
               
           

                        return;

                    }


                }

                // else{
                //    element[1] = `${element[1]} <span class="badge bg-warning text-dark">Will End Soon</span>`
                if (NewClientRemamber == true) {


                    document.querySelector('.co').innerHTML +=
                        `
                        <tr class='searchRes'>
                        <td><img class='productImage' style='width:100px' src='images/${element[3]}'></td>
                
                        <td><span class='nameProduit'>${element[1]}</span></td>
                        <td class='priceProd'>${element[2]}</td>
                       
                        <td><span class='DetectCurrentStock'>${element[4]}</span><br>
                        
                        <div class="popup">
                        <i class="toogleMinus ri-checkbox-indeterminate-fill"></i>
                       
                        <span class="popuptext myPopup" >
                          <input class="stockMinus" type="text" placeholder="Quntity" style='width: 60px;'>
                          <button class="saveMinus btn btn-primary" value='${element[0]}'>save</button>
                          <span class='alertZoneMinus' style='color:red; font-size:15px'></span>
                        </span>
                      </div>
                
                
                      <div class="popup2">
                      <i class='tooglePlus ri-add-box-fill'></i>
                      <span class="popuptext2 myPopup2">
                        <input class="stockPlus" type="text" placeholder="Quntity" style='width: 60px;'>
                        <button class="savePlus btn btn-primary" value='${element[0]}'>save</button>
                        <span class='alertZonePlus' style='color:red; font-size:15px'></span>
                      </span>
                    </div>
                
                
                        </td>
                        <td>
                        <i class="deleteThis ri-close-circle-line" value='${element[0]}'></i>
                        <i class="editThis ri-edit-2-fill" priceBuyingThis='${element[5]}' value='${element[0]}' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"></i>
                        <div class="popupAddCart" style='display : inline-block'>
                        <i productid='${element[0]}' class='toogleAddCart ri-shopping-cart-fill'></i>
                        <span class="popuptextAddCart myPopupAddCart">
                          <input class="stockAddCart" type="text" placeholder="Quntity" value='1' style='width: 60px;'>
                          <button class="saveAddCart btn" value='${element[0]}'>save</button>
                          <span class='alertZoneAddCart' style='color:red; font-size:15px'></span>
                        </span>
                      </div>
                      <div style='display : inline-block'><i class="ri-bar-chart-2-fill productStatistics" productid='${element[0]}' data-bs-toggle="modal" data-bs-target="#StatisticsModal"></i></div>
                        </td>
                        </tr>
                    
                        `
                        deleteThis()
                        editThis()
                        ProductStatistics()
                        toogleMinus()
                        stockMinus()
                        tooglePlus()
                        stockPlus()
                        toogleAddCart()
                        AddProductReal();
                        

                    return;

                } 


            })



        }


    }

  


})


document.getElementById('searchPos').addEventListener('input', () => {

  // if (AllowScan){
    var getCodeBar= document.getElementById('searchPos').value;
    FetchAllDecode.forEach(element => {
      var elementCodeBar = element[8]


      // if (SerachArray.length < 5) {

          if (elementCodeBar == getCodeBar) {
console.log(element)


              let ProductScannedData = {
                id : element[0],
                label : element[1],
                price : Number(element[2]),
                quantity : 1,
                stock : Number(element[4]),
                imgSource : `images/${element[3]}`,
                priceFinal : Number(element[2]),
                }

                if (ProductScannedData.stock == 0) {
                  document.querySelector('.alertRes2').innerHTML = `
                  <div class="alert alert-danger alert-dismissible fade show  mx-auto mt-4" role="alert">
                  Haven't in stock
                    <a type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
                   </div>
    `
                  return;
                }
       
                console.log(ProductScannedData)

           FetchAllDecode.forEach(el=>{
             if (ProductScannedData.id == el[0]) {
              ProductScannedData.priceBuying = Number(el[5])
              ProductScannedData.productEarnings = (ProductScannedData.price - ProductScannedData.priceBuying) * ProductScannedData.quantity
               console.log(ProductScannedData)
             }
           })
           
           ProductsList.forEach(element=>{
             if (element.id == ProductScannedData.id) {
               if (( Number(element.quantity) + Number(ProductScannedData.quantity) ) <=
               ProductScannedData.stock
               ) {
                 element.quantity = Number(element.quantity) + Number(ProductScannedData.quantity);
       
               }else{
              
                //  closestDiv.querySelector('.alertZoneAddCart').innerHTML = 
                //  `haven't enagh stock You have been added ${Number(element.quantity)} 
                //  and you have just ${Number(addedTR.querySelector('.DetectCurrentStock').textContent)} in Stock`
               
                document.querySelector('.alertRes2').innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show  mx-auto mt-4" role="alert">
                haven't enagh stock You have been added ${Number(element.quantity)} 
                and you have just ${Number(ProductScannedData.quantity)} in Stock
                  <a type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
                 </div>
                `

                
                 SameProduct = true
                 return;
               }
               
               element.priceFinal = Number(element.price) * Number(element.quantity)
               element.productEarnings = Number(ProductScannedData.productEarnings) + 
                                         Number(element.productEarnings)
       
             
               TotalAmount = 0
               clientEarnings = 0
               numsOfPCart = 0
               ProductsList.forEach(element=>{
                 TotalAmount += element.priceFinal
                 clientEarnings += element.productEarnings
                 numsOfPCart += element.quantity
               })
               
       
               document.querySelector('.allProductsCart').innerHTML =""
               ProductsList.forEach(element=>{
                 document.querySelector('.allProductsCart').innerHTML += `
         
                 <div class="card_item">
                 <div class="product_img">
                   <img src=${element.imgSource} alt="" /> 
                 </div>
                 <div class="product_info">
                   <div class="LabelRemove">
                     <h1>${element.label}</h1>
                     <span class="removeItem" getremoveid=${element.id}>X</span>
               </div>
                   <div class="product_rate_info">
                     <h1>${element.price}</h1>
                     <span>
                     <button type='btn' class="pqt-minus" minusCartId='${element.id}'>-</button>
                     <span class="pqt">${element.quantity} </span>
                     <button type='btn' class="pqt-plus" plusCartId='${element.id}'>+</button>
                 </span>
                   </div>
                 </div>
               </div>`
              
              
                 document.querySelector('.tp').innerHTML = `${TotalAmount.toFixed(2)} DH`
                 document.querySelector('.save').innerHTML = `
                 <button onclick='NewClientCancel()' class='btn cancelClient' style='margin: 0 15px;'>Cancel</button>
                 <button onclick='NewClientSave()' class='btn saveClient' style='margin: 0 10px;'>Save</button>
                 `

                 document.getElementById('numCartP').innerHTML = numsOfPCart


               })

               SameProduct = true
               RemoveAddedP()
               MinusAddedP()
               PlusAddedP(ProductScannedData.stock)
               document.getElementById('searchPos').value =''
             }
           })
       
       
       if (SameProduct == false) {
         
       
           ProductsList.push(ProductScannedData)
       
           TotalAmount = 0
           clientEarnings = 0
           numsOfPCart = 0
           ProductsList.forEach(element=>{
             TotalAmount += element.priceFinal
             clientEarnings += element.productEarnings
             numsOfPCart += element.quantity
           })
           
        
          document.querySelector('.allProductsCart').innerHTML += `
       
          <div class="card_item">
          <div class="product_img">
            <img src=${ProductScannedData.imgSource} alt="" /> 
          </div>
          <div class="product_info">
            <div class="LabelRemove">
              <h1>${ProductScannedData.label}</h1>
              <span class="removeItem" getremoveid=${ProductScannedData.id}>X</span>
        </div>
            <div class="product_rate_info">
              <h1>${ProductScannedData.price}</h1>
              <span>
              <button class="pqt-minus" minusCartId='${ProductScannedData.id}'>-</button>
              <span class="pqt">${ProductScannedData.quantity}</span>
              <button class="pqt-plus" plusCartId='${ProductScannedData.id}'>+</button>
          </span>
            </div>
       
          </div>
        </div>`
       
       
        // closestDiv.querySelector('.myPopupAddCart').classList.remove("showAddCart");
       
       
          document.querySelector('.tp').innerHTML = `${TotalAmount.toFixed(2)} DH`
          document.querySelector('.save').innerHTML = `
          <button onclick='NewClientCancel()' class='btn cancelClient' style='margin: 0 15px;'>Cancel</button>
          <button onclick='NewClientSave()' class='btn saveClient' style='margin: 0 10px;'>Save</button>
          `
          document.getElementById('numCartP').innerHTML = numsOfPCart
       
       
          RemoveAddedP()
          MinusAddedP()
          PlusAddedP(ProductScannedData.stock)
          document.getElementById('searchPos').value =''
         }else{
           SameProduct = false
         }

          }

      // }

  });
  // }


})


// ============================================ Clients Areas ===================================

let clientData = []
let allClientsData = [];
let clientsSmall = []

let EachCart
let cartID


document.getElementById('showClients').addEventListener('click',()=>{


  sortAsc = true
  sortAscId = false
  sortTypeEarnings = false
  sortTypeId = true

  $.ajax({
    url : 'fetchClients.php',
    type : 'GET',
    datatype : 'JSON',
    success : (data)=>{
      console.log(data)
      if (data=="NoConnect") {
        logout()
        return;
      }
      
      allClientsData = [];
      clientsSmall = []


      data = JSON.parse(data)
      clientData = data;
      console.log(data)

      data.forEach(element=>{
        clientsSmall.push(element)
        if (clientsSmall.length == 15) {
          allClientsData.push(clientsSmall)
          clientsSmall = []
        }


        if (data[data.length - 1] == element) {
          allClientsData.push(clientsSmall)
      }

        
      })

      document.querySelector('#selectNumsClient').innerHTML = "";


      for (let index = 0; index < allClientsData.length; index++) {


        let el = document.createElement('option');
        el.value = index
        el.innerHTML = index
        // el.setAttribute('class', 'nums')
        document.querySelector('#selectNumsClient').append(el);
        document.querySelector('#selectNumsClient').style = 'display: block; margin: auto 0; width: 110px'
        document.querySelector('#selectNums').style = 'display: none'
        
    }

      console.log(allClientsData)
      // allClientsData[0].forEach(element=>{

      //   if (typeof element[2] === 'string') {
      //   element[2] = JSON.parse(element[2])
      //   }
      //   EachCart = element[2]
      //   cartID = element[0]
      //   document.querySelector('.co').innerHTML += `
      //   <tr>
      //    <td>${element[0]}</td>
      //    <td>${element[1]}</td>
      //    <td id='id${cartID}'></td>
      //    <td>${element[3]}</td>
      //    <td>${element[4]}</td>
      //   </tr>
      //   `
      //   EachCart.forEach(element=>{
      //     document.getElementById(`id${cartID}`).innerHTML +=  `
      //     <p style='text-align : left'> - ${element.label} : ${element.quantity}</p>
      //     `
      //   })

      // })

      document.getElementById('AllClient').style = 'background-color: #2442ea ; color: #fff'
      document.getElementById('todayClient').style = 'background-color: #fafafa ; color: #8e8d92'
      document.getElementById('yeasterdayClient').style = 'background-color: #fafafa ; color: #8e8d92'
      
      ClientAffichage()

    }
  })

})


// Changes of sortTypeEarnings
let sortAsc = true

// Changes of sortTypeId
let sortAscId = false


// Detect Type Of Sorting To make it Colored
let sortTypeEarnings = false
let sortTypeId = true

const ClientAffichage = () =>{
  document.querySelector('.co').innerHTML = `
  <tr>
  <th>id</th>
  <th><div style='display:flex;justify-content:space-around'><p>date</p> <i style=${sortTypeId ? 'color:blue' : null} class=${sortAscId ? 'ri-sort-asc' : 'ri-sort-desc'} onclick="sortById()"></i></div></th>
  <th>cart</th>
  <th>price</th>
  <th><div style='display:flex;justify-content:space-around'><p>earnings</p> <i style=${sortTypeEarnings ? 'color:blue' : null} class=${sortAsc ? 'ri-sort-asc' : 'ri-sort-desc'} onclick="sort()"></i> </div></th>
  </tr>
  `

  let paginationClient = Number(document.getElementById('selectNumsClient').value)

  console.log(paginationClient)
  console.log(allClientsData)
  if (!allClientsData.length) return;

  allClientsData[paginationClient].forEach(element=>{

    if (typeof element[2] === 'string') {
    element[2] = JSON.parse(element[2])
    }
    EachCart = element[2]
    cartID = element[0]
    document.querySelector('.co').innerHTML += `
    <tr>
     <td>${element[0]}</td>
     <td>${element[1]}</td>
     <td id='id${cartID}'></td>
     <td>${element[3]}</td>
     <td>${element[4]}</td>
    </tr>
    `
    EachCart.forEach(element=>{
      document.getElementById(`id${cartID}`).innerHTML +=  `
      <p style='text-align : left'> - ${element.label} : ${element.quantity}</p>
      `
    })

  })

}


document.getElementById('selectNumsClient').addEventListener('change',()=>{
  ClientAffichage()
})


function sort(){

  sortTypeEarnings = true;
  sortTypeId = false


  if (sortAsc) {
    sortAsc = false
  clientData.sort( (a,b) => {return b[4]-a[4]} )
  }else{
    sortAsc = true
  clientData.sort( (a,b) => {return a[4]-b[4]} )
  }
  

  clientsSmall = []
  allClientsData = []

  clientData.forEach(element=>{

    clientsSmall.push(element)
    if (clientsSmall.length == 15) {
      allClientsData.push(clientsSmall)
      clientsSmall = []
    }

    if (clientData[clientData.length - 1] == element) {
      allClientsData.push(clientsSmall)
  }

  })

console.log(allClientsData)
ClientAffichage()
  

}


const sortById = () =>{

  sortTypeEarnings = false;
  sortTypeId = true;


  
  if (sortAscId) {
    sortAscId = false
  clientData.sort( (a,b) => {return b[0]-a[0]} )
  }else{
    sortAscId = true
  clientData.sort( (a,b) => {return a[0]-b[0]} )
  }
  

  clientsSmall = []
  allClientsData = []

  clientData.forEach(element=>{

    clientsSmall.push(element)
    if (clientsSmall.length == 15) {
      allClientsData.push(clientsSmall)
      clientsSmall = []
    }

    if (clientData[clientData.length - 1] == element) {
      allClientsData.push(clientsSmall)
  }

  })

console.log(allClientsData)
ClientAffichage()

}

document.getElementById('todayClient').addEventListener('click',()=>{
  console.log('yes clicked Today')

  document.getElementById('AllClient').style = 'background-color: #fafafa ; color: #8e8d92'
  document.getElementById('todayClient').style = 'background-color: #2442ea ; color: #fff'
  document.getElementById('yeasterdayClient').style = 'background-color: #fafafa ; color: #8e8d92'
  document.getElementById('specificDayClient').value = ''

  sortAsc = true
  sortAscId = false
  sortTypeEarnings = false
  sortTypeId = true

  $.ajax({
    url : 'getClientOfDay.php',
    type : 'GET',
    datatype : 'JSON',
    success : (data)=>{
      console.log(data)
      if (data=="NoConnect") {
        logout()
        return;
      }
      
      allClientsData = [];
      clientsSmall = []


      data = JSON.parse(data)

      clientData = data;



      console.log(data)

      data.forEach(element=>{
        clientsSmall.push(element)
        if (clientsSmall.length == 15) {
          allClientsData.push(clientsSmall)
          clientsSmall = []
        }


        if (data[data.length - 1] == element) {
          allClientsData.push(clientsSmall)
      }

        
      })

      document.querySelector('#selectNumsClient').innerHTML = "";


      for (let index = 0; index < allClientsData.length; index++) {


        let el = document.createElement('option');
        el.value = index
        el.innerHTML = index
        // el.setAttribute('class', 'nums')
        document.querySelector('#selectNumsClient').append(el);
        document.querySelector('#selectNumsClient').style = 'display: block; margin: auto 0; width: 110px'
        document.querySelector('#selectNums').style = 'display: none'
        
    }

      console.log(allClientsData)
      // allClientsData[0].forEach(element=>{

      //   if (typeof element[2] === 'string') {
      //   element[2] = JSON.parse(element[2])
      //   }
      //   EachCart = element[2]
      //   cartID = element[0]
      //   document.querySelector('.co').innerHTML += `
      //   <tr>
      //    <td>${element[0]}</td>
      //    <td>${element[1]}</td>
      //    <td id='id${cartID}'></td>
      //    <td>${element[3]}</td>
      //    <td>${element[4]}</td>
      //   </tr>
      //   `
      //   EachCart.forEach(element=>{
      //     document.getElementById(`id${cartID}`).innerHTML +=  `
      //     <p style='text-align : left'> - ${element.label} : ${element.quantity}</p>
      //     `
      //   })

      // })
      
      ClientAffichage()

    }
  })
})

document.getElementById('yeasterdayClient').addEventListener('click',()=>{
  console.log('yes clicked Today')

  document.getElementById('AllClient').style = 'background-color: #fafafa ; color: #8e8d92'
  document.getElementById('todayClient').style = 'background-color: #fafafa ; color: #8e8d92'
  document.getElementById('yeasterdayClient').style = 'background-color: #2442ea ; color: #fff'
  document.getElementById('specificDayClient').value = ''

  sortAsc = true
  sortAscId = false
  sortTypeEarnings = false
  sortTypeId = true

  $.ajax({
    url : 'getClientOfYeasterday.php',
    type : 'GET',
    datatype : 'JSON',
    success : (data)=>{
      console.log(data)
      if (data=="NoConnect") {
        logout()
        return;
      }
      
      allClientsData = [];
      clientsSmall = []


      data = JSON.parse(data)

      clientData = data;



      console.log(data)

      data.forEach(element=>{
        clientsSmall.push(element)
        if (clientsSmall.length == 15) {
          allClientsData.push(clientsSmall)
          clientsSmall = []
        }


        if (data[data.length - 1] == element) {
          allClientsData.push(clientsSmall)
      }

        
      })

      document.querySelector('#selectNumsClient').innerHTML = "";


      for (let index = 0; index < allClientsData.length; index++) {


        let el = document.createElement('option');
        el.value = index
        el.innerHTML = index
        // el.setAttribute('class', 'nums')
        document.querySelector('#selectNumsClient').append(el);
        document.querySelector('#selectNumsClient').style = 'display: block; margin: auto 0; width: 110px'
        document.querySelector('#selectNums').style = 'display: none'
        
    }

      console.log(allClientsData)
      // allClientsData[0].forEach(element=>{

      //   if (typeof element[2] === 'string') {
      //   element[2] = JSON.parse(element[2])
      //   }
      //   EachCart = element[2]
      //   cartID = element[0]
      //   document.querySelector('.co').innerHTML += `
      //   <tr>
      //    <td>${element[0]}</td>
      //    <td>${element[1]}</td>
      //    <td id='id${cartID}'></td>
      //    <td>${element[3]}</td>
      //    <td>${element[4]}</td>
      //   </tr>
      //   `
      //   EachCart.forEach(element=>{
      //     document.getElementById(`id${cartID}`).innerHTML +=  `
      //     <p style='text-align : left'> - ${element.label} : ${element.quantity}</p>
      //     `
      //   })

      // })
      
      ClientAffichage()

    }
  })
})

document.getElementById('specificDayClient').addEventListener('change',()=>{

  document.getElementById('AllClient').style = 'background-color: #fafafa ; color: #8e8d92'
  document.getElementById('todayClient').style = 'background-color: #fafafa ; color: #8e8d92'
  document.getElementById('yeasterdayClient').style = 'background-color: #fafafa ; color: #8e8d92'

  sortAsc = true
  sortAscId = false
  sortTypeEarnings = false
  sortTypeId = true

  $.ajax({
    url : 'clientSpecificDay.php',
    type : 'POST',
    datatype : 'JSON',
    data : {
      date : document.getElementById('specificDayClient').value
    },
    success : (data)=>{
      console.log(data)
      if (data=="NoConnect") {
        logout()
        return;
      }
      allClientsData = [];
      clientsSmall = []


      data = JSON.parse(data)

      clientData = data;



      console.log(data)

      data.forEach(element=>{
        clientsSmall.push(element)
        if (clientsSmall.length == 15) {
          allClientsData.push(clientsSmall)
          clientsSmall = []
        }


        if (data[data.length - 1] == element) {
          allClientsData.push(clientsSmall)
      }

        
      })

      document.querySelector('#selectNumsClient').innerHTML = "";


      for (let index = 0; index < allClientsData.length; index++) {


        let el = document.createElement('option');
        el.value = index
        el.innerHTML = index
        // el.setAttribute('class', 'nums')
        document.querySelector('#selectNumsClient').append(el);
        document.querySelector('#selectNumsClient').style = 'display: block; margin: auto 0; width: 110px'
        document.querySelector('#selectNums').style = 'display: none'
        
    }

      console.log(allClientsData)
      // allClientsData[0].forEach(element=>{

      //   if (typeof element[2] === 'string') {
      //   element[2] = JSON.parse(element[2])
      //   }
      //   EachCart = element[2]
      //   cartID = element[0]
      //   document.querySelector('.co').innerHTML += `
      //   <tr>
      //    <td>${element[0]}</td>
      //    <td>${element[1]}</td>
      //    <td id='id${cartID}'></td>
      //    <td>${element[3]}</td>
      //    <td>${element[4]}</td>
      //   </tr>
      //   `
      //   EachCart.forEach(element=>{
      //     document.getElementById(`id${cartID}`).innerHTML +=  `
      //     <p style='text-align : left'> - ${element.label} : ${element.quantity}</p>
      //     `
      //   })

      // })
      
      ClientAffichage()

    }
  })
})

document.getElementById('AllClient').addEventListener('click',()=>{

  document.getElementById('AllClient').style ='background-color: #2442ea ; color: #fff' 
  document.getElementById('todayClient').style = 'background-color: #fafafa ; color: #8e8d92'
  document.getElementById('yeasterdayClient').style = 'background-color: #fafafa ; color: #8e8d92'


  console.log('yes clicked All')

  sortAsc = true
  sortAscId = false
  sortTypeEarnings = false
  sortTypeId = true

  $.ajax({
    url : 'fetchClients.php',
    type : 'GET',
    datatype : 'JSON',
    success : (data)=>{
      console.log(data)
      if (data=="NoConnect") {
        logout()
        return;
      }
      
      allClientsData = [];
      clientsSmall = []


      data = JSON.parse(data)


      clientData = data;
      console.log(data)

      data.forEach(element=>{
        clientsSmall.push(element)
        if (clientsSmall.length == 15) {
          allClientsData.push(clientsSmall)
          clientsSmall = []
        }


        if (data[data.length - 1] == element) {
          allClientsData.push(clientsSmall)
      }

        
      })

      document.querySelector('#selectNumsClient').innerHTML = "";


      for (let index = 0; index < allClientsData.length; index++) {


        let el = document.createElement('option');
        el.value = index
        el.innerHTML = index
        // el.setAttribute('class', 'nums')
        document.querySelector('#selectNumsClient').append(el);
        document.querySelector('#selectNumsClient').style = 'display: block; margin: auto 0; width: 110px'
        document.querySelector('#selectNums').style = 'display: none'
        
    }

      console.log(allClientsData)
      // allClientsData[0].forEach(element=>{

      //   if (typeof element[2] === 'string') {
      //   element[2] = JSON.parse(element[2])
      //   }
      //   EachCart = element[2]
      //   cartID = element[0]
      //   document.querySelector('.co').innerHTML += `
      //   <tr>
      //    <td>${element[0]}</td>
      //    <td>${element[1]}</td>
      //    <td id='id${cartID}'></td>
      //    <td>${element[3]}</td>
      //    <td>${element[4]}</td>
      //   </tr>
      //   `
      //   EachCart.forEach(element=>{
      //     document.getElementById(`id${cartID}`).innerHTML +=  `
      //     <p style='text-align : left'> - ${element.label} : ${element.quantity}</p>
      //     `
      //   })

      // })
      
      ClientAffichage()

    }
  })
})


// --------------------------- End Client Area ---------------------------

