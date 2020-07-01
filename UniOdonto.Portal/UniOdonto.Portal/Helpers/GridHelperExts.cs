using System;
using System.ComponentModel;
using System.Text;
using System.Web;
using System.Web.Mvc;
using MvcJqGrid;
using MvcJqGrid.Enums;

namespace RP.Website.Helpers
{
    public static class GridHelperExts
    {
        public static Grid MyjqGrid(this HtmlHelper htmlHelper, string id, int pageSize, string onGridComplete = "")
        {
            var obj = new Grid(id)
                .SetRequestType(RequestType.Get)
                .SetRowNum(pageSize)
                .SetSortOrder(SortOrder.Asc)
                .SetShrinkToFit(true)
                .SetAutoWidth(true)
                .SetShowAllSortIcons(true)
                .SetViewRecords(true)
                .SetLoadText("...")
                .SetEmptyRecords("No Existen registros")
                .OnLoadComplete("updateGridInfo(this)")
                .SetAltRows(true).SetAltClass("altClass");

            if (!String.IsNullOrEmpty(onGridComplete))
                obj.OnGridComplete(onGridComplete);
            return obj;
        }

        #region Column methods

        public static Column Column(string columnName, object columnProperties = null)
        {
            var column = new Column(columnName).SetHidden(true);
            ApplyProperties(column, columnProperties);
            return column;
        }

        public static Column Column(string columnName, int width, string columnLabel, object columnProperties = null)
        {
            var column = new Column(columnName).SetWidth(width).SetLabel(columnLabel);
            ApplyProperties(column, columnProperties);
            return column;
        }

        private static void ApplyProperties(Column column, object columnProperties)
        {
            if (columnProperties == null) return;
            var columnType = column.GetType();
            foreach (PropertyDescriptor propertyDescriptor in TypeDescriptor.GetProperties(columnProperties))
            {
                var name = "set" + propertyDescriptor.Name;
                var methodInfo = columnType.GetMethod(name, new[] { propertyDescriptor.PropertyType });
                if (methodInfo == null) throw new InvalidOperationException("Invalid method: " + name + ".");
                methodInfo.Invoke(column, new[] { propertyDescriptor.GetValue(columnProperties) });
            }
        }

        #endregion

        #region Grid methods

        public static Grid Column(this Grid grid, string columnName, object columnProperties = null)
        {
            if (grid == null) throw new ArgumentNullException("grid");
            grid.AddColumn(Column(columnName, columnProperties));
            return grid;
        }

        public static Grid Column(this Grid grid, string columnName, int width, string columnLabel, object columnProperties = null)
        {
            if (grid == null) throw new ArgumentNullException("grid");
            grid.AddColumn(Column(columnName, width, columnLabel, columnProperties));
            return grid;
        }

        #endregion

        #region Pagination

        public static MvcHtmlString PaginationBtn(this HtmlHelper html, string grid, string @class = "")
        {

            var stringHtml = string.Format(@"<ul class='pagination {1}'>
                                                     <li  value='' class='btnHome' grid='{0}' ><span>  <i class='fa fa-fast-backward fa-lg'></i></span> </li>
                                                     <li  value='' class='btnPrev' grid='{0}'><span>  <i class='fa fa-backward fa-lg'></i></span> </li>
                                                     <li class='' ><span class='lblInfo' grid='{0}'></span></li>
                                                     <li  value='' class='btnNext' grid='{0}'><span>  <i class='fa fa-forward fa-lg'></i></span> </li>
                                                     <li  value='' class='btnEnd' grid='{0}'><span>  <i class='fa fa-fast-forward fa-lg'></i></span> </li>
                                               </ul>", grid, @class);

            return new MvcHtmlString(stringHtml);
        }

        #endregion

        #region Actions

        public static TagBuilder ActionsList(string modalId, string @class = null)
        {
            var ul = new TagBuilder("ul");
            ul.AddCssClass("list-inline actions-list");
            ul.MergeAttributes(HtmlHelper.AnonymousObjectToHtmlAttributes(new
            {
                @class = @class ?? string.Empty,
                data_modal = modalId,
            }));

            return ul;
        }

        public static TagBuilder Add(this TagBuilder tag, IHtmlString actionHtml)
        {
            var tagHtml = new StringBuilder(tag.InnerHtml);
            tagHtml.Append(actionHtml);

            tag.InnerHtml = tagHtml.ToString();
            return tag;
        }

        public static IHtmlString EditAction(string url, object id = null, string callback = null,
            string hiddenId = "Id", string @class = null, bool viewFromServerUrl = false)
        {
            id = id ?? "";
            var edit = new TagBuilder("li");
            edit.AddCssClass(@class);

            var editLnk = new TagBuilder("a");
            editLnk.AddCssClass("load-modal btn btn-primary btn-xs");
            editLnk.AddCssClass("load-modal");

            editLnk.MergeAttributes(HtmlHelper.AnonymousObjectToHtmlAttributes(new
            {
                data_action = url,
                data_id = id.ToString(),
                data_callback = callback,
                data_hidden = hiddenId,

                // tooltip
                data_toggle = "tooltip",
                title = "Editar",
            }));

            if (viewFromServerUrl)
            {
                editLnk.MergeAttribute("data-viewurl", "true");
            }
            //editLnk.InnerHtml = "<i class='glyphicon glyphicon-pencil'></i>";
            editLnk.InnerHtml = "<i class='fas fa-edit'></i>";
            //editLnk.InnerHtml = "<img style='cursor: pointer' width='22' height='22'  src='Content/Images/edit.png'/>";

            edit.InnerHtml = editLnk.ToString();
            return MvcHtmlString.Create(edit.ToString());
        }

        public static IHtmlString AddOther(string url, object id = null, string callback = null,
            string hiddenId = "Id", string @class = null, bool viewFromServerUrl = false)
        {
            id = id ?? "";
            var edit = new TagBuilder("li");
            edit.AddCssClass(@class);

            var editLnk = new TagBuilder("a");
            editLnk.AddCssClass("load-modalOther btn btn-primary btn-xs");
            editLnk.AddCssClass("load-modalOther");

            editLnk.MergeAttributes(HtmlHelper.AnonymousObjectToHtmlAttributes(new
            {
                data_action = url,
                data_id = id.ToString(),
                data_callback = callback,
                data_hidden = hiddenId,

                data_toggle = "tooltip",
                title = "Configuración",
            }));

            if (viewFromServerUrl)
            {
                editLnk.MergeAttribute("data-viewurl", "true");
            }
            //editLnk.InnerHtml = "<i class='glyphicon glyphicon-pencil'></i>";
            editLnk.InnerHtml = "<i class='fas fa-cog'></i>";
            //editLnk.InnerHtml = "<img style='cursor: pointer' width='22' height='22'  src='Content/Images/edit.png'/>";

            edit.InnerHtml = editLnk.ToString();
            return MvcHtmlString.Create(edit.ToString());
        }

        public static IHtmlString DeleteAction(string url, string gridId, object id = null, string @class = null)
        {
            id = id ?? "";
            var delete = new TagBuilder("li");

            delete.AddCssClass(@class);
            var deleteLnk = new TagBuilder("a");
            deleteLnk.AddCssClass("delete btn btn-danger btn-xs");
            //deleteLnk.AddCssClass("delete");
            deleteLnk.MergeAttributes(HtmlHelper.AnonymousObjectToHtmlAttributes(new
            {
                data_action = url,
                data_grid = gridId,
                data_id = id,
                // tooltips
                data_toggle = "tooltip",
                title = "Eliminar",
            }));
            deleteLnk.InnerHtml = "<i class='fas fa-trash'></i>";
            //deleteLnk.InnerHtml = "<img style='cursor: pointer' width='24' height='24'  src='Content/Images/delete.png'/>";

            delete.InnerHtml = deleteLnk.ToString();
            return MvcHtmlString.Create(delete.ToString());
        }

        public static IHtmlString End(this TagBuilder tag)
        {
            return MvcHtmlString.Create(tag.ToString());
        }

        public static IHtmlString CreateLink(string url, string text, string callback = null, string title = "", string @class = null)
        {
            var link = new TagBuilder("a");
            if (@class != null)
                link.AddCssClass(@class);
            link.Attributes["style"] = "color:#428bca !important; font-weight: bold";
            link.MergeAttributes(HtmlHelper.AnonymousObjectToHtmlAttributes(new
            {
                href = url,
                data_callback = callback,
                // tooltip
                title,
            }));
            link.InnerHtml = text;
            return MvcHtmlString.Create(link.ToString());
        }

        public static IHtmlString CreateFontAweson(string fontType, string extraClass, string title = "")
        {
            var i = new TagBuilder("i");
            i.AddCssClass(string.Format("fa {0}", fontType));
            i.Attributes["style"] = "color:#8ac448 !important;";
            if (extraClass != null)
            {
                i.AddCssClass(extraClass);
            }

            i.MergeAttributes(HtmlHelper.AnonymousObjectToHtmlAttributes(new { title }));
            return MvcHtmlString.Create(i.ToString());
        }
        public static HtmlString TestTagBuilder(string url, string text, string callback = null, string title = "", string @class = null, string style = null, string Subtipo = null, string icono = "fa-tag", string colorIcon = "#8ac448")
        {
            // Create the tags we need
            var div = new TagBuilder("div");
            var Descripcion = new TagBuilder("a");
            var detalle = new TagBuilder("a");
            var icon = new TagBuilder("i");

            if (@class != null)
                Descripcion.AddCssClass(@class);
            if (style != null)
                Descripcion.Attributes["style"] = style;
            Descripcion.MergeAttributes(HtmlHelper.AnonymousObjectToHtmlAttributes(new
            {
                href = url,
                data_callback = callback,
                // tooltip
                title,
            }));

            // Center the div tag
            div.AddCssClass("details-update-button-set");

            // Set up the update submit button
            Descripcion.Attributes.Add("id", "save-button");
            Descripcion.Attributes.Add("tabindex", "0");
            Descripcion.SetInnerText(text);

            // Set up the cancel button
            detalle.MergeAttributes(HtmlHelper.AnonymousObjectToHtmlAttributes(new
            {
                title,
            }));
            detalle.Attributes.Add("id", "cancel-button");
            detalle.Attributes.Add("tabindex", "0");
            detalle.Attributes["style"] = "color:#9c9b9c !important;";
            detalle.SetInnerText(Subtipo);

            //icon
            icon.AddCssClass(string.Format("fa {0}", icono));
            icon.Attributes["style"] = "color: " + colorIcon + " !important;";
            // Set the HTML for the div and return it
            div.InnerHtml = Descripcion.ToString() + "<br />" + icon.ToString() + " " + detalle.ToString();
            return new HtmlString(div.ToString());
        }
        public static HtmlString textoConImgen(bool estado, string texto)
        {
            var div = new TagBuilder("div");
            var Descripcion = new TagBuilder("a");
            var iconC = new TagBuilder("i");

            if (estado)
            {
                iconC.AddCssClass(string.Format("fa fa-lock-open text-success"));
                Descripcion.Attributes["style"] = "color:black !important;";
                Descripcion.SetInnerText(texto);
                div.InnerHtml = iconC.ToString() + "&nbsp;&nbsp;" + Descripcion.ToString();
            }
            else
            {
                iconC.AddCssClass(string.Format("fa fa-lock text-danger"));
                Descripcion.Attributes["style"] = "color:black !important;";
                Descripcion.SetInnerText(texto);
                div.InnerHtml = iconC.ToString() + "&nbsp;&nbsp;" + Descripcion.ToString();
            }

            return new HtmlString(div.ToString());
        }

        public static HtmlString TextoConImgen(string texto, string icon)
        {
            var div = new TagBuilder("div");
            var Descripcion = new TagBuilder("a");
            var iconC = new TagBuilder("i");

            iconC.AddCssClass(string.Format("fa " + icon + " text-success"));
            Descripcion.Attributes["style"] = "color:black !important;";
            Descripcion.SetInnerText(texto);
            div.InnerHtml = iconC.ToString() + "&nbsp;&nbsp;" + Descripcion.ToString();


            return new HtmlString(div.ToString());
        }

        public static HtmlString detalleDos(bool text, bool Subtipo = false, bool inventarios = false)
        {
            // Create the tags we need
            var div = new TagBuilder("div");
            var Descripcion = new TagBuilder("a");
            var detalle = new TagBuilder("a");
            var inventario = new TagBuilder("a");
            var iconC = new TagBuilder("span");
            var iconV = new TagBuilder("span");
            var iconI = new TagBuilder("span");

            // Center the div tag
            div.AddCssClass("details-update-button-set");

            //icon
            iconC.AddCssClass(string.Format("glyphicon glyphicon-log-in"));
            iconV.AddCssClass(string.Format("glyphicon glyphicon-log-out"));
            iconI.AddCssClass(string.Format("glyphicon glyphicon-th-large"));

            if (text)
            {
                Descripcion.Attributes["style"] = "color:black !important; font-weight: bold";
                Descripcion.SetInnerText("Para Compra");
                div.InnerHtml = iconC.ToString() + "&nbsp;&nbsp;" + Descripcion.ToString();
            }
            if (Subtipo)
            {
                detalle.Attributes["style"] = "color:black !important; font-weight: bold";
                detalle.SetInnerText("Para Venta");
                div.InnerHtml += "<br />" + iconV.ToString() + "&nbsp;&nbsp;" + detalle.ToString();
            }
            if (inventarios)
            {
                inventario.Attributes["style"] = "color:black !important; font-weight: bold";
                inventario.SetInnerText("Inventario");
                div.InnerHtml += "<br />" + iconI.ToString() + "&nbsp;&nbsp;" + inventario.ToString();
            }
            return new HtmlString(div.ToString());
        }
        public static HtmlString detallePersonas(string text, string txt2 = "", bool op1 = false, bool op2 = false, bool op3 = false, bool op4 = false, bool op5 = false)
        {
            // Create the tags we need
            var div = new TagBuilder("div");
            var descripcion = new TagBuilder("a");
            var subDescripcion = new TagBuilder("a");
            var inventario = new TagBuilder("a");
            var icon = new TagBuilder("span");

            icon.AddCssClass(string.Format("glyphicon glyphicon-user"));
            icon.Attributes["style"] = "color:#55960B  !important;";

            descripcion.Attributes["style"] = "color:#428bca !important; font-weight: bold";
            descripcion.SetInnerText(text);
            div.InnerHtml = descripcion.ToString();

            subDescripcion.Attributes["style"] = "color:black !important; font-weight: bold";

            if (op1)
            {
                txt2 += " -Cliente";
            }
            if (op2)
            {
                txt2 += " -Empleado";
            }
            if (op3)
            {
                txt2 += " -Proveedor";
            }
            if (op4)
            {
                txt2 += " -Vendedor";
            }
            if (op5)
            {
                txt2 += " -Accionista";
            }

            subDescripcion.SetInnerText(txt2);
            div.InnerHtml += "<br />" + icon.ToString() + "  " + subDescripcion.ToString();
            return new HtmlString(div.ToString());
        }

        public static HtmlString detalleSuperiorInferior(string url, string text, string title = "", string Subtipo = "")
        {
            var div = new TagBuilder("div");
            var Descripcion = new TagBuilder("a");
            var detalle = new TagBuilder("a");
            var icon = new TagBuilder("i");

            Descripcion.MergeAttributes(HtmlHelper.AnonymousObjectToHtmlAttributes(new
            {
                href = url,
                title,
            }));
            Descripcion.MergeAttribute("target", "_blank");
            Descripcion.SetInnerText(text);
            Descripcion.Attributes["style"] = "color:#428bca !important; font-weight: bold; font-size: 12px;";
            // Set up the cancel button
            detalle.MergeAttributes(HtmlHelper.AnonymousObjectToHtmlAttributes(new
            {
                title,
            }));

            switch (Subtipo)
            {
                case "INGRESO":
                    icon.AddCssClass(string.Format("glyphicon glyphicon-log-in"));
                    break;
                case "EGRESO":
                    icon.AddCssClass(string.Format("glyphicon glyphicon-log-out"));
                    break;
                case "TRASLADO":
                    icon.AddCssClass(string.Format("glyphicon glyphicon-new-window"));
                    break;
                case "AJUSTE DE COSTO":
                    icon.AddCssClass(string.Format("glyphicon glyphicon-wrench"));
                    break;
                default:
                    icon.AddCssClass(string.Format("glyphicon glyphicon-tag"));
                    break;
            }
            detalle.Attributes["style"] = "color:black !important; font-weight: bold";
            detalle.SetInnerText(Subtipo);

            //icon.AddCssClass(string.Format("fa {0}", "fa-tag"));
            //icon.Attributes["style"] = "color:#8ac448 !important;";

            div.InnerHtml = Descripcion.ToString() + "<br />" + icon.ToString() + detalle.ToString();
            return new HtmlString(div.ToString());
        }

        public static HtmlString detalleSuperiorInferiorImagen(string url, string text, string title = "", string Subtipo = "", string tipo = "", string color = "")
        {
            var div = new TagBuilder("div");
            var Descripcion = new TagBuilder("a");
            var detalle = new TagBuilder("a");
            var icon = new TagBuilder("i");

            Descripcion.MergeAttributes(HtmlHelper.AnonymousObjectToHtmlAttributes(new
            {
                href = url,
                title,
            }));
            Descripcion.MergeAttribute("target", "_blank");
            Descripcion.SetInnerText(text);
            Descripcion.Attributes["style"] = "color:#428bca !important; font-weight: bold; font-size: 12px;";
            // Set up the cancel button
            detalle.MergeAttributes(HtmlHelper.AnonymousObjectToHtmlAttributes(new
            {
                title,
            }));

            detalle.Attributes["style"] = "color:black !important; font-weight: bold";
            detalle.SetInnerText(Subtipo);

            icon.AddCssClass(string.Format("fa {0} {1}", tipo, color));
            //   icon.Attributes["style"] = "color:#8ac448 !important;";

            div.InnerHtml = Descripcion.ToString() + "<br />" + icon.ToString() + "   " + detalle.ToString();
            return new HtmlString(div.ToString());
        }

        public static HtmlString DetalleSuperiorInferiorDos(string url, string text, string title = "", string texto = "", string icono = "", string color = "", string texto2 = "", string icono2 = "fa-check-circle", string color2 = "text-success")
        {
            var div = new TagBuilder("div");
            var Descripcion = new TagBuilder("a");
            var detalle = new TagBuilder("a");
            var detalle2 = new TagBuilder("a");
            var icon = new TagBuilder("i");
            var icon2 = new TagBuilder("i");

            Descripcion.MergeAttributes(HtmlHelper.AnonymousObjectToHtmlAttributes(new
            {
                href = url,
                title,
            }));
            Descripcion.MergeAttribute("target", "_blank");
            Descripcion.SetInnerText(text);
            Descripcion.Attributes["style"] = "color:#428bca !important; font-weight: bold; font-size: 12px;";

            detalle.MergeAttributes(HtmlHelper.AnonymousObjectToHtmlAttributes(new
            {
                title,
            }));
            detalle.Attributes["style"] = "color:black !important; font-weight: bold";
            detalle.SetInnerText(texto);
            icon.AddCssClass(string.Format("fa {0} {1}", icono, color));
            div.InnerHtml = Descripcion.ToString() + "<br />" + icon.ToString() + "   " + detalle.ToString();

            if (texto2 != "")
            {
                detalle2.MergeAttributes(HtmlHelper.AnonymousObjectToHtmlAttributes(new
                {
                    title,
                }));
                detalle2.Attributes["style"] = "color:black !important; font-weight: bold";
                detalle2.SetInnerText(texto2);

                icon2.AddCssClass(string.Format("fa {0} {1}", icono2, color2));

                div.InnerHtml += "    " + icon2.ToString() + " " + detalle2.ToString();
            }

            return new HtmlString(div.ToString());
        }
        public static IHtmlString CreateSpan(string title = "", string @class = null)
        {
            var span = new TagBuilder("span");
            span.SetInnerText(title);
            if (@class != null)
                span.AddCssClass(@class);
            span.MergeAttributes(HtmlHelper.AnonymousObjectToHtmlAttributes(new { title }));
            return MvcHtmlString.Create(span.ToString());
        }

        public static IHtmlString CreateSpanHome(string title = "", string @background = "#17a2b8", string @color = "#fff")
        {
            var span = new TagBuilder("span");
            span.SetInnerText(title);
            span.Attributes["style"] = "color:" + @color + " !important; font-weight: bold; background-color:" + @background + " !important; font-size:10px";
            span.AddCssClass("badge");
            span.MergeAttributes(HtmlHelper.AnonymousObjectToHtmlAttributes(new { title }));
            return MvcHtmlString.Create(span.ToString());
        }

        public static HtmlString DetalleSuperiorInferiorSinLink(string textS, string txtI = "", string icono = "fa-calendar", string color = "text-success")
        {
            var div = new TagBuilder("div");
            var descripcion = new TagBuilder("a");
            var subDescripcion = new TagBuilder("a");
            var inventario = new TagBuilder("a");
            var icon = new TagBuilder("span");
            icon.AddCssClass(string.Format("fa {0} {1}", icono, color));
            descripcion.Attributes["style"] = "color:#428bca !important; font-weight: bold";
            descripcion.SetInnerText(textS);
            div.InnerHtml = descripcion.ToString();
            subDescripcion.Attributes["style"] = "color:black !important; font-weight: bold";
            if (txtI != "")
            {
                subDescripcion.SetInnerText(txtI);
                div.InnerHtml += "<br />" + icon.ToString() + "  " + subDescripcion.ToString();
            }
            return new HtmlString(div.ToString());
        }
        #endregion
    }
}