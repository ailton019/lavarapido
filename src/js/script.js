function enviarSolicitacao(evento) {
  evento.preventDefault(); // Impede o envio padrão para não recarregar a página

  // Pega os valores dos campos do formulário
  const nome = document.getElementById("nome").value.trim();
  const endereco = document.getElementById("endereco").value.trim();
  const tipoVeiculo = document.getElementById("tipo-veiculo").value;

  // Coleta os checkboxes marcados
  const servicosSelecionados = Array.from(
    document.querySelectorAll('input[name="servicos"]:checked')
  ).map(el => el.nextSibling.textContent.trim() || el.value);

  // Número de WhatsApp para onde a mensagem será enviada
  const numeroWhatsApp = "5511949409834";

  // Verifica se todos os campos obrigatórios foram preenchidos
  if (!nome || !endereco || !tipoVeiculo || servicosSelecionados.length === 0) {
    alert("Por favor, preencha todos os campos e selecione pelo menos um serviço antes de enviar.");
    return;
  }

  // Monta a mensagem que será enviada pelo WhatsApp
  const mensagem = encodeURIComponent(
    `🚗 *Nova solicitação de lavagem:*\n\n` +
    `👤 Nome: ${nome}\n` +
    `📍 Endereço: ${endereco}\n` +
    `🚙 Tipo de veículo: ${tipoVeiculo}\n` +
    `🛠 Serviços: ${servicosSelecionados.join(", ")}`
  );

  // Cria a URL para o WhatsApp
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

  // Abre o link em nova aba
  window.open(urlWhatsApp, "_blank");
}
