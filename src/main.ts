import {Tags} from "./tag.ts";

function getContrastColor(hex: string): string
{
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#1a1a1a" : "#ffffff";
}

function generateBarcode(): string
{
    const bars: string[] = [];
    for (let i = 0; i < 20; i++)
    {
        const w = Math.random() > 0.5 ? 3 : 1;
        bars.push(`<span style="width:${w}px"></span>`);
    }
    return bars.join("");
}

function renderTags(filter: string = "")
{
    const list = document.getElementById("discount-list");
    if (!list) return;
    list.innerHTML = "";

    const lowerFilter = filter.toLowerCase();
    for (const key in Tags)
    {
        const tag = Tags[key];
        const percentStr = `${tag.percentage * 100}%`;
        if (lowerFilter && !tag.tag.toLowerCase().includes(lowerFilter) && !percentStr.includes(lowerFilter))
        {
            continue;
        }

        const textColor = getContrastColor(tag.color);
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="tag-color" style="background:${tag.color};color:${textColor}">
                <div class="tag-name">${tag.tag} tag</div>
                <div class="tag-percent">${percentStr}</div>
            </div>
            <div class="tag-barcode">${generateBarcode()}</div>
        `;
        li.addEventListener("click", () =>
        {
            window.location.search = `?tag=${encodeURIComponent(tag.tag)}`;
        });
        list.appendChild(li);
    }
}

const tagQueryIndex = window.location.search.search("tag");
if (tagQueryIndex != -1)
{
    const tagFromQuery = window.location.search.substring(tagQueryIndex + 4); // removes the tag=
    const tagDiscount = Tags[tagFromQuery];
    if (tagDiscount)
    {
        const discountElement = document.getElementById("discount-value");
        if (discountElement)
            discountElement.innerHTML = `${tagDiscount.percentage * 100}%`;
    }
}

const yearElement = document.getElementById("year");
if (yearElement)
    yearElement.innerHTML = new Date().getFullYear().toString();

renderTags();

const searchInput = document.getElementById("discount-search") as HTMLInputElement | null;
searchInput?.addEventListener("input", () =>
{
    renderTags(searchInput.value);
});
