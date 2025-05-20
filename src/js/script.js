// Função para enviar a solicitação via WhatsApp quando o formulário for enviado
function enviarSolicitacao(evento) {
  evento.preventDefault(); // Impede o envio padrão para não recarregar a página

  // Pega os valores dos campos do formulário
  const nome = document.getElementById("nome").value.trim();
  const endereco = document.getElementById("endereco").value.trim();
  const tipoVeiculo = document.getElementById("tipo-veiculo").value;

  // Número de WhatsApp para onde a mensagem será enviada (alterar para seu número)
  const numeroWhatsApp = "5511999999999";

  // Verifica se todos os campos foram preenchidos
  if (!nome || !endereco || !tipoVeiculo) {
    alert("Por favor, preencha todos os campos antes de enviar.");
    return;
  }

  // Monta a mensagem que será enviada pelo WhatsApp
  const mensagem = encodeURIComponent(
    `🚗 *Nova solicitação de lavagem:*\n\n` +
    `👤 Nome: ${nome}\n` +
    `📍 Endereço: ${endereco}\n` +
    `🚙 Tipo de veículo: ${tipoVeiculo}`
  );

  // Cria a URL para o WhatsApp Web ou aplicativo
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

  // Abre o link em nova aba para enviar a mensagem pelo WhatsApp
  window.open(urlWhatsApp, "_blank");
}
