using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;

namespace UniOdonto.Comun
{
    [Serializable]
    public class FilaExcel : ICollection<CeldaExcel>, ICloneable
    {
        private int _index;
        private int _currentCell;
        private List<CeldaExcel> _celdas;

        public int Fila { get; set; }

        public CeldaExcel this[int index]
        {
            get { return _celdas.Count < index ? _celdas[index] : new CeldaExcel("EMPTY"); }
            set { _celdas[index] = value; }
        }

        public CeldaExcel this[string columna]
        {
            get { return _celdas.FirstOrDefault(c => c.Columna == columna) ?? new CeldaExcel("EMPTY"); }
            set
            {
                var celda = _celdas.FirstOrDefault(c => c.Columna == columna);
                celda = value;
            }
        }

        public CeldaExcel PorNombre(string nombre)
        {
            return _celdas.FirstOrDefault(c => c.Nombre == nombre);
        }

        public FilaExcel()
        {
            _celdas = new List<CeldaExcel>();
            Fila = 1;
        }

        public IEnumerator<CeldaExcel> GetEnumerator()
        {
            return _celdas.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }

        public void Add(CeldaExcel item)
        {
            item.Fila = Fila;
            _celdas.Add(item);
            item.FilaExcel = this;

            Refresh();
        }

        public void Clear()
        {
            _celdas.Clear();
            Refresh();
        }

        public bool Contains(CeldaExcel item)
        {
            return _celdas.Contains(item);
        }

        public void CopyTo(CeldaExcel[] array, int arrayIndex)
        {
            _celdas.CopyTo(array, arrayIndex);
        }

        public bool Remove(CeldaExcel item)
        {
            var flag = _celdas.Remove(item);
            Refresh();
            return flag;
        }

        public int Count
        {
            get { return _celdas.Count; }
        }
        public bool IsReadOnly { get; private set; }

        private void Refresh()
        {
            var i = 1;
            foreach (var celda in _celdas)
            {
                celda.Index = _index++;
                celda.Columna = GetNombreColumna(i++);
            }
        }

        private string GetNombreColumna(int numeroColumna)
        {
            const string abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var length = abc.Length;
            if (numeroColumna <= abc.Length)
            {
                return abc[numeroColumna - 1].ToString();
            }
            var ciclos = (numeroColumna - 1) / length;
            var residuo = numeroColumna % abc.Length;
            if (residuo == 0)
            {
                residuo = abc.Length;
            }
            if (ciclos > length)
                return GetNombreColumna(ciclos) + abc.Substring(residuo - 1, 1);

            return string.Format("{0}{1}", abc.Substring(ciclos - 1, 1), abc.Substring(residuo - 1, 1));
        }

        public void NewFila()
        {
            _currentCell = -1;
            Fila++;
            foreach (var celdaExcel in _celdas)
            {
                celdaExcel.Fila = Fila;
                celdaExcel.Valor = null;
            }
        }

        public CeldaExcel NextCell()
        {
            if (_celdas.Count > _currentCell)
            {
                return _celdas[++_currentCell];
            }
            return new CeldaExcel("");
        }

        public void NextCellValue(object valor)
        {
            NextCell().Valor = valor;
        }
        public CeldaExcel CurrentCell
        {
            get
            {
                if (_currentCell == -1)
                {
                    return NextCell();
                }
                return _celdas[_currentCell];
            }
            set
            {
                _currentCell = _celdas.FindIndex(c => c.Columna == value.Columna);
            }
        }

        object ICloneable.Clone()
        {
            return Clone();
        }
        public FilaExcel Clone()
        {
            var ms = new MemoryStream();
            var bf = new BinaryFormatter();

            bf.Serialize(ms, this);

            ms.Position = 0;
            var obj = bf.Deserialize(ms);
            ms.Close();

            return obj as FilaExcel;
        }

    }
}