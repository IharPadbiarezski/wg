document.addEventListener('DOMContentLoaded', loadData);

// Execute the function to query the API
function loadData() {
	fetch('../data/orders.json')
		.then((response) => response.json())
		.then((orders) => {
			let ordersList = '';
			orders.forEach((order) => {
				let orderDate = timeConverter(order.created_at);

				ordersList += `
                    <tr id="order_${order.id}">
                        <td>${order.transaction_id}</td>
                        <td class="user_data">${order.user_id}</td>
                        <td>${orderDate}</td>
                        <td>$${order.total}</td>
                        <td>${order.card_number}</td>
                        <td>${order.card_type}</td>
                        <td>${order.order_country} (${order.order_ip})</td>
                    </tr>
                 `;
				console.log(order);
			});
			document.getElementById('orders').innerHTML = ordersList;
		})
		.catch((error) => console.log(error));
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
