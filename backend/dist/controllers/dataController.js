"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteData = exports.updateData = exports.addData = exports.getDataById = exports.getAllData = void 0;
// Örnek veri
var data = [
    { id: 1, name: 'Veri 1', description: 'Bu veri 1 için açıklama' },
    { id: 2, name: 'Veri 2', description: 'Bu veri 2 için açıklama' },
];
// Tüm verileri getirme
var getAllData = function (req, res) {
    res.json(data);
};
exports.getAllData = getAllData;
// ID'ye göre veri getirme
var getDataById = function (req, res) {
    var id = parseInt(req.params.id);
    var foundData = data.find(function (item) { return item.id === id; });
    if (foundData) {
        res.json(foundData);
    }
    else {
        res.status(404).json({ message: 'Veri bulunamadı' });
    }
};
exports.getDataById = getDataById;
// Yeni veri ekleme
var addData = function (req, res) {
    var newData = req.body;
    data.push(newData);
    res.status(201).json(newData);
};
exports.addData = addData;
// Veri güncelleme
var updateData = function (req, res) {
    var id = parseInt(req.params.id);
    var updateData = req.body;
    var index = data.findIndex(function (item) { return item.id === id; });
    if (index !== -1) {
        data[index] = updateData;
        res.json(updateData);
    }
    else {
        res.status(404).json({ message: 'Güncellenecek veri bulunamadı' });
    }
};
exports.updateData = updateData;
// Veri silme
var deleteData = function (req, res) {
    var id = parseInt(req.params.id);
    var index = data.findIndex(function (item) { return item.id === id; });
    if (index !== -1) {
        var deletedData = data.splice(index, 1);
        res.json(deletedData[0]);
    }
    else {
        res.status(404).json({ message: 'Silinecek veri bulunamadı' });
    }
};
exports.deleteData = deleteData;
