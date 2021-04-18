function validateYear(age){
   var data = age; 
   data = data.replace(/\//g, "-"); 
   var data_array = data.split("-"); 
    

   if(data_array[0].length != 4){
      data = data_array[2]+"-"+data_array[1]+"-"+data_array[0];
   }
    
   
   var hoje = new Date();
   var nasc  = new Date(data);
   var idade = hoje.getFullYear() - nasc.getFullYear();
   var m = hoje.getMonth() - nasc.getMonth();
   if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
    
   if(idade < 18){
      risco = "Baixo";
      return risco;
   }
 
   else if(idade >= 18 && idade <= 60){
      risco = "Médio";
      return risco;
   }
    
   else{
      risco = "Alto";
      return risco
   }
    
}

module.exports = validateYear;