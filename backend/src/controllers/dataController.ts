

import { Request, Response } from 'express';
import { IData } from '../interfaces/IData';

// Örnek veri
let data: IData[] = [
  { id: 1, name: 'Veri 1', description: 'Bu veri 1 için açıklama' },
  { id: 2, name: 'Veri 2', description: 'Bu veri 2 için açıklama' },
];

// Tüm verileri getirme
export const getAllData = (req: Request, res: Response) => {
  res.json(data);
};

// ID'ye göre veri getirme
export const getDataById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const foundData = data.find(item => item.id === id);
  if (foundData) {
    res.json(foundData);
  } else {
    res.status(404).json({ message: 'Veri bulunamadı' });
  }
};

// Yeni veri ekleme
export const addData = (req: Request, res: Response) => {
  const newData: IData = req.body;
  data.push(newData);
  res.status(201).json(newData);
};

// Veri güncelleme
export const updateData = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const updateData: IData = req.body;
  const index = data.findIndex(item => item.id === id);
  if (index !== -1) {
    data[index] = updateData;
    res.json(updateData);
  } else {
    res.status(404).json({ message: 'Güncellenecek veri bulunamadı' });
  }
};

// Veri silme
export const deleteData = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = data.findIndex(item => item.id === id);
  if (index !== -1) {
    const deletedData = data.splice(index, 1);
    res.json(deletedData[0]);
  } else {
    res.status(404).json({ message: 'Silinecek veri bulunamadı' });
  }
};
export { IData };

