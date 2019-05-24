document.addEventListener('DOMContentLoaded', loadData);

// Execute the function to query the API
function loadData() {
	fetch('../data/orders.json')
		.then((response) => response.json())
		.then((orders) => {
			let ordersList = '';
			orders.forEach((order) => {
				ordersList += `
                    <tr id="order_${order.id}">
                        <td>${order.transaction_id}</td>
                        <td class="user_data">${order.user_id}</td>
                        <td>${order.created_at} 21/12/2017, 1:13:47 AM</td>
                        <td>$${order.total}</td>
                        <td>${order.card_number}</td>
                        <td>${order.card_type}</td>
                        <td>IS (${order.order_ip})</td>
                    </tr>
                 `;
			});

			document.getElementById('orders').innerHTML = ordersList;
		})
		.catch((error) => console.log(error));
}
