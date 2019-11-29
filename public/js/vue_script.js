var socket = io();
var vm = new Vue({
el: '#menu',
data: {
		burgers : food,
		chosen: [],
		customerName:"",
		email:"",
		payment:"",
		gender:"",
		orderlist:"",
		details:{},
		oID: 0
	},
		created: function () {
			socket.on('initialize', function (data) {
				this.oID = (Object.keys(data.orders).length);
			}.bind(this));
/*
			socket.on('currentQueue', function (data) {
				this.orders = data.orders;
			}.bind(this));*/
},
methods: {
		/*getNext: function () {
			var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
				return Math.max(last, next);
			}, 0);
			return lastOrder + 1;
		},*/
		getNext2: function () {
		this.oID = this.oID + 1
		return this.oID
		},
		displayOrder: function(event){
			console.log("display");
      var offset = {x: event.currentTarget.getBoundingClientRect().left,
        y: event.currentTarget.getBoundingClientRect().top};
        this.details = {x: event.clientX-10 - offset.x,
          y: event.clientY - 10 - offset.y};
        },
				addOrder: function (event) {
								this.orderlist = "Dina uppgifter"+"\n"+
								this.customerName+"\n"+
								this.email+"\n"+
								this.payment+"\n"+"\n"+
								"Din order:"+"\n"+
								this.chosen;
								console.log(this.orderlist);
								console.log("addmyorder");
		           	 socket.emit("addOrder", { orderId: this.getNext2(),
		             details: this.details,
		             orderItems: this.chosen,
		             orderName: this.customerName,
		             orderMail: this.email,
		             orderPayment: this.payment,
		             orderGender: this.gender
		           });
							 /*this.orders.push({orderId: this.getNext(),
							 details: this.details,
							 orderItems: this.chosen,
							 orderName: this.customerName,
							 orderMail: this.email,
							 orderPayment: this.payment,
							 orderGender: this.gender
						 });*/
		},
}
});
