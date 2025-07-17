const loadAllThePhone = async (status, brand) => {
    document.getElementById('loder').classList.add('hidden')
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brand ? brand : "iphone"}`);
    const data = await response.json();
    if (status) {
        displayAllThePhone(data.data)
    }
    else {
        displayAllThePhone(data.data.slice(0, 6))
    }
}

const displayAllThePhone = (phones) => {
 const phoneContainer = document.getElementById('phone-container');

    phones.forEach(phone => {
        const {brand, image, slug} = phone ;
        const div = document.createElement('div');
        div.innerHTML = `
<div class="card bg-base-100 shadow-md py-4">
    <figure>
        <img src=${image} />
    </figure>
    <div class="card-body text-center">
        <h2 class="text-xl font-semibold text-center">${brand}</h2>
        <p class="text-gray-500">${slug}</p>
        <div class="card-actions justify-center">
            <button onClick="handleDetailsPhone('${slug}')" class="btn btn-success">Show Details</button>
        </div>
    </div>
</div>
`
       phoneContainer.appendChild(div);
    });
}

const searchBox = document.getElementById('search-box').value;
function handleSearch() {
    document.getElementById('loder').classList.remove('hidden')
    setTimeout(() => {
        loadAllThePhone(false, searchBox)
    }, 3000);
}

const handleDetails = () => {
    loadAllThePhone(true)
}

const handleDetailsPhone = async(slugs) => {
    const response = await fetch(` https://openapi.programming-hero.com/api/phone/${slugs}`);
    const data = await response.json();

    const {brand, image, slug} = data.data ;

  const modalContainer =  document.getElementById('modal-container');
  modalContainer.innerHTML = `
      <dialog id="my_modal_1" class="modal">
        <div class="modal-box text-center">
            <h3 class="text-2xl font-bold mb-3">${brand}</h3>
            <img class="mx-auto" src="${image}">
            <p class="py-4 font-semibold">${slugs}</p>
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn">Close</button>
                </form>
            </div>
        </div>
    </dialog>
  `
  my_modal_1.showModal();
}
loadAllThePhone(false, "iphone")