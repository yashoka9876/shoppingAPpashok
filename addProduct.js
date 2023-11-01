const productForm = document.getElementById("addProductFrom");
const table = document.getElementById("productTable");

productForm.addEventListener("submit", addProduct);

async function addProduct(e) {
  e.preventDefault();
  try {
    const iname = document.getElementById("item").value;
  const desc = document.getElementById("description").value;
  const quantity = document.getElementById("quantity").value;
  const price = document.getElementById("price").value;

  const stockObject = {
    iname,
    desc,
    price,
    quantity,
  };

  const promise = await axios.post(
    "https://crudcrud.com/api/860ba5dc8f144486ba730d699ec678f9/StockData",
    stockObject
  );

  document.getElementById("item").value = "";
  document.getElementById("description").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("price").value = "";
  
  // calling showDataOnScreen 
  showDataOnScreen(promise.data);
  } catch (error) {
    console.log(error)
  }
}

// Buying functions

async function buyOne(id) {
  // console.log(id)
  
  try {
    const td = document.getElementById(`${id}`);
  const tr = document.getElementById(`${id}abc`);
  // console.log(tr)
  if (td.innerText > 0) {
    td.innerText = td.innerText - 1;
   let result = await axios.get(
        `https://crudcrud.com/api/860ba5dc8f144486ba730d699ec678f9/StockData/${id}`
      )
      console.log('hhhhh')
      // .then((res) => {
        // console.log(res.data.iname)
      await axios.put(
          `https://crudcrud.com/api/860ba5dc8f144486ba730d699ec678f9/StockData/${id}`,
          {
            iname: result.data.iname,
            desc: result.data.desc,
            price: result.data.price,
            quantity: result.data.quantity - 1,
          }
        );
      // });
  } else {
    tr.remove();
    
  }
  } catch (error) {
    console.log(error)
  }
}

async function buyTwo(id) {
  // console.log(id)
  try {
    const td = document.getElementById(`${id}`);
  const tr = document.getElementById(`${id}abc`);
  if (td.innerText > 0) {
    td.innerText = td.innerText - 2;
    let result = await axios.get(
        `https://crudcrud.com/api/860ba5dc8f144486ba730d699ec678f9/StockData/${id}`
      )
      // .then((res) => {
        // console.log(res.data.iname)
       await axios.put(
          `https://crudcrud.com/api/860ba5dc8f144486ba730d699ec678f9/StockData/${id}`,
          {
            iname: result.data.iname,
            desc: result.data.desc,
            price: result.data.price,
            quantity: result.data.quantity - 2,
          }
        );
      // });
  } else {
    tr.remove();
  }

  } catch (error) {
    console.log(error)
  }
}

async function buyThree(id) {
  // console.log(id)
 
  try {
    const td = document.getElementById(`${id}`);
    const tr = document.getElementById(`${id}abc`);
    if (td.innerText > 0) {
      td.innerText = td.innerText - 3;
     let result = await axios.get(
          `https://crudcrud.com/api/860ba5dc8f144486ba730d699ec678f9/StockData/${id}`
        )
        // .then((res) => {
          // console.log(res.data.iname)
          axios.put(
            `https://crudcrud.com/api/860ba5dc8f144486ba730d699ec678f9/StockData/${id}`,
            {
              iname: result.data.iname,
              desc: result.data.desc,
              price: result.data.price,
              quantity: result.data.quantity - 3,
            }
          );
        // });
    } else {
      tr.remove();
    }
  } catch (error) {
    console.log(error)
  }
}



function showDataOnScreen(response) {
  const children = `<tbody>
                        <tr id="${response._id}abc">
                            <td>${response.iname}</td>
                            <td>${response.desc}</td>
                            <td>${response.price}-Rs</td>
                            <td id="${response._id}">${response.quantity}</td>
                            <td>
                            <button class="buy-button" onclick="buyOne('${response._id}')" onclick="refreshPage()">Buy_1</button>
                            <button class="buy-button" onclick="buyTwo('${response._id}')" onclick="refreshPage()">Buy_2</button>
                            <button class="buy-button" onclick="buyThree('${response._id}')" onclick="refreshPage()">Buy_3</button>
                            </td>
                        </tr>
                        
                      </tbody>`;
  table.innerHTML += children;
}

async function OnloadData() {
let response = await axios.get("https://crudcrud.com/api/860ba5dc8f144486ba730d699ec678f9/StockData")
    // .then((response) => {
      response.data.forEach((stocks) => {
        showDataOnScreen(stocks);
        // console.log(element)
      });
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
}

// function refreshPage() {
//     location.reload();
//   }


 