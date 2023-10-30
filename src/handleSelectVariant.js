export function handleVariantValue(eventTarget, listVariant, listOption) {
	// danh sách input đã chọn 
	const inputLst = Array.from(document.querySelectorAll("#variant-list .group-radio .radio-hidden:checked"));
	const inputAllLst = Array.from(document.querySelectorAll("#variant-list .group-radio .radio-hidden"));
	const groupInputLst = Array.from(document.querySelectorAll("#variant-list .group-radio"));

	if(inputLst.length == groupInputLst.length){
		let inputs;
		if(inputLst.length > 2){
			inputs = inputLst.filter(input => input.name != eventTarget.name )
		}
		else{
			inputs = inputLst.map(input => input )
		}
		
		inputs.forEach(input => {
			var props = [];
			if(inputLst.length > 2){
				for (let i = 0; i < inputLst.length - 1; i++) {
					if( i == inputLst.length - 2 ) props.push(eventTarget.id)
					else props.push(input.id) // id thuộc tính đã chọn
				};
			}
			else{
				props.push(input.id) // id thuộc tính đã chọn
			}
			
			// danh sách group input khác với group input đã chọn 
			var groupInputOtherLst = [];
			groupInputLst.forEach(groupInput => {
				if (groupInput.getAttribute("aria-labelledby") != input.name && groupInput.getAttribute("aria-labelledby") != eventTarget.name)
					groupInputOtherLst.push(groupInput)
			})
			
			// list biến thể chứa các thuộc tính đã chọn => true,
			const itemFilterLst = filterVariant(props, listVariant);
			groupInputOtherLst.forEach(groupInputOther => {
				const inputOtherLst = groupInputOther.querySelectorAll(".radio-hidden")

				// reset giá trị của attr disabled
				resetDisableAttr(inputOtherLst);

				// danh sách id của các giá trị thuộc tính còn lại có trong biến thể không bị ẩn 
				let idValueLst = filterIdValue(itemFilterLst, props);

				// xử lý disable các giá trị thuộc tính biến thể bị ẩn
				handleDisabled(idValueLst, inputOtherLst)
			})
		})
		
	}
	else{
		if(eventTarget.checked == true){
			// danh sách group input khác với group input đã chọn 
			var groupInputOtherLst = [];
			groupInputLst.forEach(groupInput => {
				let flag = true;
				inputLst.forEach(input => {
					if (groupInput.getAttribute("aria-labelledby") == input.name) flag = false
				})
				if (flag)
					groupInputOtherLst.push(groupInput)
			})

			// danh sách id giá trị thuộc tính đã chọn
			var props = inputLst.map(input => input.id);
			

			// list biến thể chứa các thuộc tính đã chọn => true, 
			const itemFilterLst = filterVariant(props, listVariant);

			groupInputOtherLst.forEach(groupInputOther => {
				const inputOtherLst = groupInputOther.querySelectorAll(".radio-hidden")

				// reset giá trị của attr disabled
				resetDisableAttr(inputOtherLst);
	
				// danh sách id của các giá trị thuộc tính còn lại có trong biến thể không bị ẩn 
				let idValueLst = filterIdValue(itemFilterLst, props);

				// xử lý disable các giá trị thuộc tính biến thể bị ẩn
				handleDisabled(idValueLst, inputOtherLst)
			})
		}
		else{
			if(inputLst.length == 0){
				inputAllLst.forEach(item => {
					item.checked = false
					if(listOption.length > 1) {
						item.disabled = false
					}
				})
			}
			else{
				// danh sách group input khác với group input đã chọn 
				var groupInputOtherLst = [];
				groupInputLst.forEach(groupInput => {
					let flag = true;
					for(let i=0; i < inputLst.length; i++){
						if (groupInput.getAttribute("aria-labelledby") == inputLst[i].name) flag = false
					}
					if (flag) groupInputOtherLst.push(groupInput)
				})

				inputLst.forEach(input => {
					inputAllLst.forEach(inputAll => {
						if(inputAll.name == input.name) inputAll.disabled = false
					})
				})

				// danh sách id giá trị thuộc tính đã chọn
				var props = inputLst.map(input => input.id);
				

				// list biến thể chứa các thuộc tính đã chọn => true, 
				const itemFilterLst = filterVariant(props, listVariant);

				groupInputOtherLst.forEach(groupInputOther => {
					const inputOtherLst = groupInputOther.querySelectorAll(".radio-hidden")

					// reset giá trị của attr disabled
					resetDisableAttr(inputOtherLst);
		
					// danh sách id của các giá trị thuộc tính còn lại có trong biến thể không bị ẩn 
					let idValueLst = filterIdValue(itemFilterLst, props);

					// xử lý disable các giá trị thuộc tính biến thể bị ẩn
					handleDisabled(idValueLst, inputOtherLst)
				})

			}
		}
	}
}

function changeVariant(idVariant, productChosen) {
	// cập nhật biến thể vào giỏ hàng
	if (document.getElementById("react-update-variant")) {
		var btnUpdateVariant = document.getElementById("react-update-variant")
		btnUpdateVariant.setAttribute("data-item", idVariant);
	}
	else if (document.getElementById("react-btn-add-cart")) {
		var btnAddCart = document.getElementById("react-btn-add-cart")
		btnAddCart.setAttribute("data-item", idVariant);
	}
	  // hiển thị giá biến thể
	  var showPrice = document.querySelector("#react-show-price"); 
	 
	  // điều kiện hiển thị giá biến thể
	  if(showPrice) {
		  productChosen.variantCombinations.map(item => {
			  if (item.id == idVariant) {
				  if (item.quantity == 0 && productChosen.isAblePreorder == false) {
						showPrice.innerHTML = '<p class="text-heading-4 font-semibold text-error-400">Hết hàng</p>';
						btnAddCart.style.display = "none";
				  } else {
						btnAddCart.style.display = "flex";
						if (item.sellPrice == 0) {
							showPrice.innerHTML = `<p class="text-error-400 font-semibold text-heading-4">
								${
								Number(item.originalPrice).toLocaleString('vi-VN', {
									style: 'currency',
									currency: 'VND'
								})
							}
							</p> `
						} else {
							showPrice.innerHTML = ` <div class="flex gap-2 items-center">
							<p class="text-xl text-neutral-1-600 line-through font-semibold">
								${
								Number(item.originalPrice).toLocaleString('vi-VN', {
									style: 'currency',
									currency: 'VND'
								})
							}
							</p>
							<p class="text-error-400 font-semibold text-heading-4">
								${
								Number(item.displayPrice).toLocaleString('vi-VN', {
									style: 'currency',
									currency: 'VND'
								})
							}
							</p>
							</div>`
						}
				  }
			  }
		  })
	  }
}

// Tìm list biến thể chứa các thuộc tính đã chọn => true
function filterVariant(props, listVariant){
	const itemLst = listVariant.filter(variant => {
		let listIdVariantValues = variant.variantValues.map(value => value.id.toString());
		let flag = true;
		for (var i = 0; i < props.length; i++) {
			if (!listIdVariantValues.includes(props[i])) {
				flag = false;
			}
		}
		return flag;
	})
	return itemLst;
}

// Tìm danh sách id của các giá trị thuộc tính còn lại có trong biến thể không bị ẩn  
function filterIdValue(itemFilterLst, props){
	let idValueLst = [];
	itemFilterLst.forEach(variant => {
		let listIdVariantValues = variant.variantValues.map(value => value.id.toString());
		listIdVariantValues.forEach(value => {
			let flag = true;
			for (var i = 0; i < props.length; i++) {
				if (value == props[i]) {
					flag = false;
				}
			}
			if(flag) {
				if(!idValueLst.includes(value)) idValueLst.push(value)
			}
		})
	})
	return idValueLst;
}

// reset giá trị của attr disable của group input 
function resetDisableAttr(inputOtherLst){
	inputOtherLst.forEach(inputOther => {
		inputOther.disabled = false;
	})
}

// disable các giá trị thuộc tính bị ẩn 
function handleDisabled(idValueLst, inputOtherLst){
	for (let i = 0; i < inputOtherLst.length; i++) {
		if (!idValueLst.includes(inputOtherLst[i].id)) {
			inputOtherLst[i].disabled = true
		} 
		else inputOtherLst[i].disabled = false
	}
}

// active ảnh biến thể được chọn 
export function activeImage(inputCheckedLst, productChosen, listVariant) {
	var imageLst = document.querySelectorAll(".image-variant");
	var props = inputCheckedLst.map(inputChecked => inputChecked.id);
	var dataChosen = {};

	// Tìm biến thể chứa các thuộc tính đã chọn => true, 
	// nếu ko tìm thấy 01 thuộc tính trong biến thề thì trả về false thoát khỏi for
	const itemFilter = listVariant.find(variant => {
		let listIdVariantValues = variant.variantValues.map(value => value.id.toString());
		let flag = false;
		for (var i = 0; i < props.length; i++) {
			if (listIdVariantValues.includes(props[i])) {
				flag = true;
			} else {
				flag = false;
				break;
			}
		}
		return flag;
	})
	if (itemFilter) {
		dataChosen = itemFilter; // biến thể chứa các thuộc tính đã chọn
	};
	changeVariant(dataChosen.id, productChosen)

	// hiển thị hình biến thể
	for (let i = 0; i < imageLst.length; i++) {
		const imageChosen = imageLst[i].getAttribute('data-id');
		//thêm class active vào hình biến thể đc chọn
		if (imageChosen == dataChosen.id) {
			imageLst[i].classList.add("active-image");
		} else {
			imageLst[i].classList.remove("active-image");
		}

		const activeImage = document.querySelector(".active-image");
		const activeImageSrc = document.querySelector(".active-image .image-custom");
		const defaultImage = document.getElementById("image-default");
		if(activeImage) {
			var getActiveImageSrc = activeImageSrc.getAttribute('src');
		}
		// điều kiện nếu biến thể không có hình thì sẽ hiện hình của sản phẩm
		if(imageChosen == dataChosen.id) {
			if(getActiveImageSrc == "") {
				if (defaultImage.classList.contains('hidden')) {
					defaultImage.classList.replace('hidden', 'flex');
				}
				if (activeImage.classList.contains('flex')) {
					activeImage.classList.replace('flex', 'hidden');
				}
			} else {
				if (defaultImage.classList.contains('flex')) {
					defaultImage.classList.replace('flex', 'hidden');
				}
				if (activeImage.classList.contains('hidden')) {
					activeImage.classList.replace('hidden', 'flex');
				}
			}
		} else {
			if (imageLst[i].classList.contains('flex')) {
				imageLst[i].classList.replace('flex', 'hidden');
			}
		}
	}
}

export function handleVariantDefault(productDetail) {
	if(productDetail.variantCombinations.length > 0) {
		var listVariant = productDetail.variantCombinations;

		// danh sách input đã chọn 
		const groupInputLst = Array.from(document.querySelectorAll("#variant-list .group-radio"));
	
		const inputCheckedLst = Array.from(document.querySelectorAll("#variant-list .group-radio .radio-hidden:checked"));
		inputCheckedLst.forEach((input, index) => {
			var props = [];
			if(inputCheckedLst.length > 2){
				for (let i = 0; i < inputCheckedLst.length - 1; i++) {
					if( i == inputCheckedLst.length - 2 ) {
						props.push(input.id)
					}
					else{
						if( index == inputCheckedLst.length - 1) {
							props.push(inputCheckedLst[0].id)
						}
						else {
							props.push(inputCheckedLst[index + 1 + i].id)
						}
					}
				};
			}
			else{
				props.push(input.id)
			}
			
			if(groupInputLst.length > 1){
				// danh sách group input khác với group input đã chọn 
				var groupInputOtherLst = [];
	
				if(groupInputLst.length == 2){
					groupInputLst.forEach(groupInput => {
						if (groupInput.getAttribute("aria-labelledby") != input.name ) 
							groupInputOtherLst.push(groupInput);
					})
				}
				else{
					groupInputLst.forEach(groupInput => {
						let flag = true;
						for(let i=0; i < inputCheckedLst.length - 2; i++){
							if(index == inputCheckedLst.length - 1 ){
								if (groupInput.getAttribute("aria-labelledby") == inputCheckedLst[0].name) flag = false
							}
							else{
								if (groupInput.getAttribute("aria-labelledby") == inputCheckedLst[index + 1].name) flag = false
							}
						}
						if (groupInput.getAttribute("aria-labelledby") != input.name && flag)
							groupInputOtherLst.push(groupInput)
					})
				}
				
	
				// list biến thể chứa các thuộc tính đã chọn => true,
				var itemFilterLst = filterVariant(props, listVariant);
	
				groupInputOtherLst.forEach(groupInputOther => {
				const inputOtherLst = Array.from(groupInputOther.querySelectorAll(".radio-hidden"));
	
				// reset giá trị của attr disabled
				resetDisableAttr(inputOtherLst);
	
				// danh sách id của các giá trị thuộc tính còn lại có trong biến thể không bị ẩn 
				let idValueLst = filterIdValue(itemFilterLst, props);
	
				// xử lý disable các giá trị thuộc tính biến thể bị ẩn
				handleDisabled(idValueLst, inputOtherLst)
			})
			}
			else{
				groupInputOtherLst = groupInputLst;
				itemFilterLst = listVariant;
	
				groupInputLst.forEach(groupInputOther => {
					const inputOtherLst = Array.from(groupInputOther.querySelectorAll(".radio-hidden")).filter(input => input.id != props[0]);
	
					// reset giá trị của attr disabled
					resetDisableAttr(inputOtherLst);
	
					// danh sách id của các giá trị thuộc tính còn lại có trong biến thể không bị ẩn 
					let idValueLst = filterIdValue(listVariant, props);
	
					// xử lý disable các giá trị thuộc tính biến thể bị ẩn
					handleDisabled(idValueLst, inputOtherLst)
				})
			}
		})
	}
}