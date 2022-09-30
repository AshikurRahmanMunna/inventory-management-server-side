const Stock = require("../models/Stock");

exports.getStocksService = async (filters, queries) => {
  const stocks = await Stock.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);
  const total = await Stock.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);
  return { stocks, total, page };
};

exports.createStockService = async (data) => {
  const stock = await Stock.create(data);
  return stock;
};

exports.getStockByIdService = async (id) => {
  const stock = await Stock.findOne({ _id: id })
    .populate("store.id")
    .populate("suppliedBy.id")
    .populate("brand.id");
  return stock;
};

// exports.updateProductByIdService = async (productId, data) => {
//   const result = await Stock.updateOne(
//     { _id: productId },
//     { $set: data },
//     {
//       runValidators: true,
//     }
//   );
//   return result;
// };

// exports.bulkUpdateProductService = async (data) => {
//   // const result = await Product.updateMany({ _id: data.ids }, data.data, {
//   //   runValidators: true,
//   // });
//   const products = [];
//   data.ids.forEach((product) => {
//     products.push(Stock.updateOne({ _id: product.id }, product.data));
//   });

//   const result = await Promise.all(products);
//   return result;
// };

// exports.deleteProductByIdService = async (id) => {
//   const result = await Stock.deleteOne({ _id: id });
//   return result;
// };

// exports.bulkDeleteProductService = async (ids) => {
//   const result = await Stock.deleteMany({ _id: ids });
//   return result;
// };
