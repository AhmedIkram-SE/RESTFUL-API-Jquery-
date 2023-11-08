$(function(){
    ToGet();
    $("#products").on("click","#delete",ToDel);
    $("#Add").click(ToADD);
    $("#products").on("click","#ed",ToEdit);
    $("#uedit").click(Update);
    $("#close").click(()=>{
        $(".edit").removeClass("edit_show");
    });
})

function ToGet(){
    $.ajax({
        url:"https://usman-fake-api.herokuapp.com/api/products",
        method:"GET",
        success:function(response){
            var par=$("#products");
            par.empty();
            par.append(`<table id="table"><tr><th>Name</th><th>Price</th><th>Color</th><th>Department</th><th>Description</th></tr></table>`)
            for(let i=0;i<response.length;i++) {
                var tab=$("#table");
                var res=response[i];
                tab.append(`<tr id="row" data_id="${res._id}"><td>${res.name}</td><td>${res.price}</td><td>${res.color}</td><td>${res.department}</td><td>${res.description}</td><td><button id="ed">Edit</button></td><td><button id="delete">Delete</Button></td></tr>`)
            }
    }

    })
}

function ToDel(){
    var but=$(this);
    var parent=but.closest("#row");
    var id=parent.attr("data_id");

    $.ajax({
        url:"https://usman-fake-api.herokuapp.com/api/products/"+id,
        method:"DELETE",
        success:function(){
            ToGet();
        }
    })
}

function ToADD(){
    let name=$("#name").val();
    let price=$("#price").val();
    let color=$("#color").val();
    let department=$("#department").val();
    let description=$("#description").val();
    $.ajax({
        url:"https://usman-fake-api.herokuapp.com/api/products",
        method:"POST",
        data:{name,price,color,department,description},
        success:function(){
            ToGet();
        }
    })
}

function ToEdit(){
    var but1=$(this);
    var parent1=but1.closest("#row");
    var id1=parent1.attr("data_id");

    $.get("https://usman-fake-api.herokuapp.com/api/products/"+id1,function(success){
        var id1=$("#id").val(success._id);
        var name1=$("#name1").val(success.name);
        var price1=$("#price1").val(success.price);
        var color1=$("#color1").val(success.color);
        var department1=$("#department1").val(success.department);
        var description1=$("#description1").val(success.description)
        $(".edit").addClass("edit_show");
    })
}

function Update() {
    var id=$("#id").val();
    var name=$("#name1").val();
    var price=$("#price1").val();
    var color=$("#color1").val();
    var department=$("#department1").val();
    var description=$("#description1").val();

    $.ajax({
        url:"https://usman-fake-api.herokuapp.com/api/products/"+id,
        method:"PUT",
        data:{name,price,color,department,description},
        success:function(){
            ToGet();
            $(".edit").removeClass("edit_show");
        }
    })
}