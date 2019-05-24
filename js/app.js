// Variables
const userInfoLink = document.querySelector('table');
console.log(userInfoLink);

// Evemt Listeners

document.addEventListener('DOMContentLoaded', loadData);
userInfoLink.addEventListener('click', (e) => {
	if (e.target.className === 'user-link') {
		e.target.nextElementSibling.classList.toggle('user-details');
	}
});

// Functions

// Execute the function to query the API
function loadData() {
	fetch('../data/orders.json')
		.then((response) => response.json())
		.then((orders) => {
			let ordersList = '';
			orders.forEach((order) => {
				let orderDate = timeConverter(order.created_at);
				let safeCardNumber = hideMiddleCardNumbers(order.card_number);

				ordersList += `
                    <tr id="order_${order.id}">
                        <td>${order.transaction_id}</td>
                        <td class="user_data" data-id="${order.user_id}">${order.user_id}</td>
                        <td>${orderDate}</td>
                        <td>$${order.total}</td>
                        <td>${safeCardNumber}</td>
                        <td>${order.card_type}</td>
                        <td>${order.order_country} (${order.order_ip})</td>
                    </tr>
                 `;
				// console.log(order);
			});
			document.getElementById('orders').innerHTML = ordersList;
			getUserInfo();
		})
		.catch((error) => console.log(error));
}

function hideMiddleCardNumbers(cardNumber) {
	let firstTwoNumbers = cardNumber.substring(0, 2);
	let newCardNumber;
	let lastNumbers;
	lastNumbers = cardNumber.substring(2).replace(/\d(?=\d{4})/g, '*');
	newCardNumber = firstTwoNumbers + lastNumbers;
	return newCardNumber;
}

function timeConverter(UNIX_timestamp) {
	const a = new Date(UNIX_timestamp * 1000);
	const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
	const year = a.getFullYear();
	const month = months[a.getMonth()];
	const date = a.getDate();
	let hour = a.getHours();
	const min = a.getMinutes();
	const sec = a.getSeconds();
	let hourNew = hour % 12 || 12;
	let ampm = hour < 12 ? 'AM' : 'PM';
	let time = `${date}/${month}/${year}, ${hourNew}:${min}:${sec} ${ampm}`;
	return time;
}

function dateConverter(UNIX_timestamp) {
	const a = new Date(UNIX_timestamp * 1000);
	const year = a.getFullYear();
	const month = a.getMonth();
	const date = a.getDate();
	let convertDate = `${date}/${month}/${year}`;
	return convertDate;
}

function getUserInfo() {
	fetch('../data/users.json')
		.then((response) => response.json())
		.then((users) => {
			users.forEach((user) => {
				let userBirthday;
				if (user.birthday) {
					userBirthday = dateConverter(user.birthday);
				}
				let userOrders = document.querySelectorAll('.user_data');
				userOrders.forEach((userOrder) => {
					let userDiv = `
                        <div class="user-details">
                            <p>Birthday: ${userBirthday}</p>
                            <p><img src="${user.avatar}" width="100px"></p>
                            <p>Company: <a href="http://awesome.website" target="_blank">Bumbershoot Corp.</a></p>
                            <p>Industry: Apparel / Consumer Services</p>
                        </div>
                    `;

					if (userOrder.textContent == user.id && user.gender === 'Male') {
						let html = `
                            <a class="user-link" href="#">Mr. ${user.first_name} ${user.last_name}</a>
                            ${userDiv}
                        `;
						userOrder.innerHTML = html;
					}

					if (userOrder.textContent == user.id && user.gender === 'Female') {
						let html = `
                            <a class="user-link" href="#">Ms. ${user.first_name} ${user.last_name}</a>
                            ${userDiv}
                        `;
						userOrder.innerHTML = html;
					}
				});
			});

			console.log(users);
		})
		.catch((error) => console.log(error));
}

function getCompanies() {
	fetch('../data/companies.json')
		.then((response) => response.json())
		.then((companies) => {
			companies.forEach((company) => {
				let userBirthday;
				if (user.birthday) {
					userBirthday = dateConverter(user.birthday);
				}
				let userOrders = document.querySelectorAll('.user_data');
				userOrders.forEach((userOrder) => {
					let userDiv = `
                        <div class="user-details">
                            <p>Birthday: ${userBirthday}</p>
                            <p><img src="${user.avatar}" width="100px"></p>
                            <p>Company: <a href="http://awesome.website" target="_blank">Bumbershoot Corp.</a></p>
                            <p>Industry: Apparel / Consumer Services</p>
                        </div>
                    `;

					if (userOrder.textContent == user.id && user.gender === 'Male') {
						let html = `
                            <a href="#">Mr. ${user.first_name} ${user.last_name}</a>
                            ${userDiv}
                        `;
						userOrder.innerHTML = html;
					}

					if (userOrder.textContent == user.id && user.gender === 'Female') {
						let html = `
                            <a class="user-link" href="#">Ms. ${user.first_name} ${user.last_name}</a>
                            ${userDiv}
                        `;
						userOrder.innerHTML = html;
					}
				});
			});

			console.log(companies);
		})
		.catch((error) => console.log(error));
}
