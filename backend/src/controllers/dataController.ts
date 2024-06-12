import { Request, Response } from 'express';
import { IData } from '../interfaces/IData';
import fs from 'fs';
import path from 'path';

// Veri dosyasının yolu
const dataFilePath = path.join(__dirname, '..', 'data', 'data.json');

// Veriyi dosyadan okuma
const readDataFromFile = (): IData[] => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Veri okuma hatası:', error);
    return [];
  }
};

// Veriyi dosyaya yazma
const writeDataToFile = (data: IData[]): void => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Veri yazma hatası:', error);
  }
};

// Tüm verileri getirme
export const getAllData = (req: Request, res: Response) => {
  const data = readDataFromFile();
  res.json(data);
};

// ID'ye göre veri getirme
export const getDataById = (req: Request, res: Response) => {
  const data = readDataFromFile();
  const id = req.params.id;
  const foundData = data.find(item => item.id === id);
  if (foundData) {
    res.json(foundData);
  } else {
    res.status(404).json({ message: 'Veri bulunamadı' });
  }
};

// Yeni veri ekleme
export const addData = (req: Request, res: Response) => {
  const data = readDataFromFile();
  const newData: IData = req.body;
  // Yeni veri eklerken ID'yi otomatik artır
  const newId = data.length > 0 ? (parseInt(data[data.length - 1].id) + 1).toString() : '1';
  newData.id = newId;
  data.push(newData);
  writeDataToFile(data);
  res.status(201).json(newData);
};

// Veri güncelleme
export const updateData = (req: Request, res: Response) => {
  const data = readDataFromFile();
  const id = req.params.id;
  const updateData: IData = req.body;
  const index = data.findIndex(item => item.id === id);
  if (index !== -1) {
    data[index] = updateData;
    writeDataToFile(data);
    res.json(updateData);
  } else {
    res.status(404).json({ message: 'Güncellenecek veri bulunamadı' });
  }
};

// Veri silme
export const deleteData = (req: Request, res: Response) => {
  const data = readDataFromFile();
  const id = req.params.id;
  const index = data.findIndex(item => item.id === id);
  if (index !== -1) {
    const deletedData = data.splice(index, 1);
    writeDataToFile(data);
    res.json(deletedData[0]);
  } else {
    res.status(404).json({ message: 'Silinecek veri bulunamadı' });
  }
};
