const array = [ 'variant color', 'variant size', 'variant type name', 'variant test prop another' ];

const variant = {
  id: '12',
  items: [
    { name: 'Sepatu', price: 20000, quantity: 1 },
    { name: 'Baju', price: 50500, quantity: 1 }
  ],
  method: [ 'BCA', 'BNI', 'BRI', 'QRIS', 'OVO', 'DANA', 'SHOPEEPAY' ],
  variant: { color: 'blue', size: 27, type: {name: "Jarang"}, test: {prop: {another: "test value"}} }
};

// Looping untuk mengambil nilai dari array dan mengakses properti objek secara dinamis
for (let i = 0; i < array.length; i++) {
  const splitArray = array[i].split(" ");
  const propName = splitArray[1];
  let nestedPropName = "";
  nestedPropName = splitArray.slice(splitArray.length - 1)
  console.log(propName)
  console.log(nestedPropName)
}
