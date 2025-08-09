  const precosBase = {
    pequeno: 60,
    caminhonete: 100,
    van: 150,
    caminhao: 200,
    moto: 100
  };

  let valorBase = 0; // guarda o valor inicial do veículo

  function selecionarVeiculo() {
    const tipoVeiculo = document.getElementById("tipo-veiculo").value;
    if (!tipoVeiculo) return;

    // Define valor base
    valorBase = precosBase[tipoVeiculo] || 0;

    // Marca lavagem completa e desmarca lavagem simples
    const lavagemCompleta = document.querySelector('input[value="lavagem-rapida-completa"]');
    const lavagemSimples = document.querySelector('input[value="lavagem-simples"]');
    if (lavagemCompleta) lavagemCompleta.checked = true;
    if (lavagemSimples) lavagemSimples.checked = false;

    atualizarPreco();
  }

  function atualizarPreco() {
    let valorTotal = valorBase;

    const servicos = document.querySelectorAll('input[name="servicos"]');
    servicos.forEach(servico => {
      // Acrescenta R$20 para outros serviços (exceto lavagem simples e completa)
      if (servico.checked && servico.value !== "lavagem-rapida-completa" && servico.value !== "lavagem-simples") {
        valorTotal += 20;
      }
      // Se for lavagem simples, aplica desconto de 50% no valor base
      if (servico.value === "lavagem-simples" && servico.checked) {
        valorTotal = valorTotal / 2;
      }
    });

    document.getElementById("valor-total").textContent = `R$ ${valorTotal.toFixed(2)}`;
  }

  function enviarSolicitacao(evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const tipoVeiculo = document.getElementById("tipo-veiculo").value;
    const valorFinal = document.getElementById("valor-total").textContent;

    const servicosSelecionados = Array.from(
      document.querySelectorAll('input[name="servicos"]:checked')
    ).map(el => el.nextSibling.textContent.trim() || el.value);

    if (!nome || !endereco || !tipoVeiculo || servicosSelecionados.length === 0) {
      alert("Preencha todos os campos!");
      return;
    }

    const numeroWhatsApp = "5511949409834";
    const mensagem = encodeURIComponent(
      `🚗 *Nova solicitação:*\n\n` +
      `👤 Nome: ${nome}\n` +
      `📍 Endereço: ${endereco}\n` +
      `🚙 Veículo: ${tipoVeiculo}\n` +
      `🛠 Serviços: ${servicosSelecionados.join(", ")}\n` +
      `💰 Valor Total: ${valorFinal}`
    );

    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensagem}`, "_blank");
  }

  // Eventos
  document.getElementById("tipo-veiculo").addEventListener("change", selecionarVeiculo);
  document.querySelectorAll('input[name="servicos"]').forEach(input => {
    input.addEventListener("change", atualizarPreco);
  });