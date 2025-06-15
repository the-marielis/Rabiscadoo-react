/**
 * Converte uma string de data ISO para o formato dd/MM/yyyy
 * @param {string} dataISO - Data no formato ISO (ex: "1899-11-30T03:06:28.000Z")
 * @returns {string} - Data formatada no formato dd/MM/yyyy
 */
export function converteDataBR(dataISO) {
    if (!dataISO) return "";

    const date = new Date(dataISO);

    if (isNaN(date)) return "Data inválida";

    const dia = String(date.getUTCDate()).padStart(2, '0');
    const mes = String(date.getUTCMonth() + 1).padStart(2, '0'); // mês zero-based
    const ano = date.getUTCFullYear();

    return `${dia}/${mes}/${ano}`;
}

export function converteDataUsa(dataBR) {
    if (!dataBR || !dataBR.includes("/")) return ""; // <-- proteção
    const [dia, mes, ano] = dataBR.split("/");
    return `${ano}-${mes}-${dia}`;
}

