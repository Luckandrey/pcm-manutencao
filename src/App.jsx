import { useEffect, useMemo, useState } from "react";

const sections = [
  { id: "dashboard", label: "Dashboard" },
  { id: "ordem-servico", label: "Ordem de Serviço" },
  { id: "ordem-manutencao", label: "Ordem de Manutenção" },
  { id: "materiais", label: "Materiais" },
  { id: "validacao", label: "Validação" },
];

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  const [activeSection, setActiveSection] = useState("dashboard");

  const [os, setOs] = useState({
    numero: "OS-2026-001",
    data: "2026-03-15",
    hora: "18:30",
    setor: "Produção",
    linha: "Linha 01",
    solicitante: "",
    funcaoSolicitante: "",
    codigoEquipamento: "",
    nomeEquipamento: "",
    criticidade: "Alta",
    prioridade: "Urgente",
    descricaoFalha: "",
    status: "Aberta",
    maquinaLiberada: "Não",
    anexo: "",
  });

  const [om, setOm] = useState({
    responsavel: "",
    equipeApoio: "",
    dataExecucao: "2026-03-15",
    horaInicio: "",
    horaFim: "",
    tipoManutencao: "Corretiva",
    causaProblema: "",
    servicoRealizado: "",
    paradaProducao: "Sim",
    tempoParado: "",
    acaoPreventiva: "",
    validacaoPCM: "Pendente",
    observacoes: "",
  });

  const [materiais, setMateriais] = useState([
    { descricao: "", quantidade: 1, custoUnitario: 0 },
  ]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.2, 0.4, 0.6],
      }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const totalMateriais = useMemo(() => {
    return materiais.reduce((acc, item) => {
      const qtd = Number(item.quantidade) || 0;
      const custo = Number(item.custoUnitario) || 0;
      return acc + qtd * custo;
    }, 0);
  }, [materiais]);

  const totalItens = useMemo(() => {
    return materiais.reduce(
      (acc, item) => acc + (Number(item.quantidade) || 0),
      0
    );
  }, [materiais]);

  const updateOS = (field, value) => {
    setOs((prev) => ({ ...prev, [field]: value }));
  };

  const updateOM = (field, value) => {
    setOm((prev) => ({ ...prev, [field]: value }));
  };

  const updateMaterial = (index, field, value) => {
    setMateriais((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const addMaterial = () => {
    setMateriais((prev) => [
      ...prev,
      { descricao: "", quantidade: 1, custoUnitario: 0 },
    ]);
  };

  const removeMaterial = (index) => {
    setMateriais((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToSection = (id) => {
    setActiveSection(id);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleFillExample = () => {
    setOs((prev) => ({
      ...prev,
      solicitante: "Marcelo Lima",
      funcaoSolicitante: "Operador de linha",
      codigoEquipamento: "MB-01",
      nomeEquipamento: "Masseira 01",
      setor: "Produção",
      linha: "Linha de Biscoitos",
      criticidade: "Alta",
      prioridade: "Urgente",
      descricaoFalha:
        "Equipamento apresentou ruído anormal, vibração elevada e aquecimento no mancal lateral durante a operação.",
      anexo: "foto_masseira_01.jpg",
      maquinaLiberada: "Não",
      status: "Em execução",
    }));

    setOm((prev) => ({
      ...prev,
      responsavel: "João Carlos Souza",
      equipeApoio: "Auxiliar de manutenção",
      horaInicio: "15:10",
      horaFim: "17:05",
      tipoManutencao: "Corretiva",
      causaProblema:
        "Desgaste do rolamento lateral e lubrificação insuficiente no conjunto de transmissão.",
      servicoRealizado:
        "Desmontagem parcial, substituição do rolamento, reaperto de fixadores, limpeza, relubrificação e teste funcional do equipamento.",
      tempoParado: "1h40",
      acaoPreventiva:
        "Incluir inspeção semanal de vibração e revisar o plano de lubrificação da Masseira 01.",
      validacaoPCM: "Aprovado",
      observacoes:
        "Equipamento liberado após teste operacional com funcionamento normal.",
      paradaProducao: "Sim",
    }));

    setMateriais([
      { descricao: "Rolamento 6205 ZZ", quantidade: 1, custoUnitario: 48 },
      { descricao: "Graxa alimentícia", quantidade: 1, custoUnitario: 9 },
      { descricao: "Parafuso sextavado M8", quantidade: 2, custoUnitario: 2.5 },
    ]);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors dark:bg-[#09090b] dark:text-zinc-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-zinc-200 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-black/40 lg:block">
          <div className="border-b border-zinc-200 p-6 dark:border-white/10">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              PCM
            </p>
            <h1 className="mt-2 text-2xl font-bold">Manutenção</h1>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Ordem de Serviço e Ordem de Manutenção
            </p>
          </div>

          <div className="p-4">
            <nav className="space-y-2">
              {sections.map((section) => (
                <MenuItem
                  key={section.id}
                  active={activeSection === section.id}
                  label={section.label}
                  onClick={() => scrollToSection(section.id)}
                />
              ))}
            </nav>

            <div className="mt-8 rounded-3xl border border-zinc-200 bg-zinc-100 p-4 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-2xl">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Fluxo
              </p>
              <div className="mt-4 space-y-3">
                <FlowStep number="1" title="Operador abre OS" />
                <FlowStep number="2" title="Equipe executa OM" />
                <FlowStep number="3" title="Validação e encerramento" />
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-[#0b0b10]/80">
            <div className="mx-auto max-w-7xl px-6 py-5">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-lg font-bold text-black shadow-[0_10px_30px_rgba(34,211,238,0.25)] dark:text-white">
                    PM
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
                        PCM • Planejamento e Controle da Manutenção
                      </p>
                      <span className="rounded-full border border-cyan-300 bg-cyan-50 px-2.5 py-1 text-[11px] font-semibold text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-500/10 dark:text-cyan-300">
                        Protótipo acadêmico
                      </span>
                    </div>

                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                      Ordem de Serviço + Ordem de Manutenção
                    </h2>

                    <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                      Interface pensada para facilitar a abertura, execução,
                      acompanhamento e encerramento das ordens de manutenção de
                      forma clara, organizada e amigável.
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
                        Gestão visual
                      </span>
                      <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
                        Fluxo OS → OM
                      </span>
                      <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
                        Controle de materiais
                      </span>
                      <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
                        Modo claro/escuro
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 xl:items-end">
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-300 bg-white text-zinc-800 transition hover:scale-[1.03] hover:bg-zinc-100 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
                      title={
                        theme === "dark"
                          ? "Ativar modo claro"
                          : "Ativar modo escuro"
                      }
                    >
                      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                    </button>

                    <button
                      onClick={handleFillExample}
                      className="rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-cyan-400"
                    >
                      Preencher exemplo
                    </button>

                    <button
                      onClick={handlePrint}
                      className="rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
                    >
                      Imprimir / Salvar PDF
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <MiniHeaderStat label="Status" value={os.status} />
                    <MiniHeaderStat label="Prioridade" value={os.prioridade} />
                    <MiniHeaderStat label="Setor" value={os.setor} />
                    <MiniHeaderStat
                      label="Custo"
                      value={`R$ ${totalMateriais.toFixed(2)}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-7xl px-6 py-8">
            <section id="dashboard" className="space-y-8">
              <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <InfoCard
                  title="Como abrir a OS"
                  text="A operação registra o equipamento, a falha observada e a prioridade do atendimento."
                />
                <InfoCard
                  title="Como preencher a OM"
                  text="A manutenção informa a causa do problema, o serviço executado e o tempo de parada."
                />
                <InfoCard
                  title="Materiais e custos"
                  text="Cada item usado na manutenção é lançado para compor o custo final da ordem."
                />
                <InfoCard
                  title="Validação e encerramento"
                  text="Ao final, a ordem pode ser revisada, validada e o equipamento liberado para produção."
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <StatCard title="Número da OS" value={os.numero} glow="cyan" />
                <StatCard
                  title="Status"
                  value={os.status}
                  badge={statusBadge(os.status)}
                  glow="blue"
                />
                <StatCard
                  title="Prioridade"
                  value={os.prioridade}
                  badge={priorityBadge(os.prioridade)}
                  glow="red"
                />
                <StatCard
                  title="Custo total"
                  value={`R$ ${totalMateriais.toFixed(2)}`}
                  glow="emerald"
                />
              </div>
            </section>

            <div className="mt-8 grid gap-8 xl:grid-cols-[1.4fr_0.6fr]">
              <div className="space-y-8">
                <div id="ordem-servico">
                  <SectionCard
                    title="Dados da Ordem de Serviço"
                    subtitle="Preenchimento inicial pela operação."
                    badge="Etapa 1"
                    badgeClass="bg-cyan-500/15 text-cyan-700 border border-cyan-400/20 dark:text-cyan-300"
                  >
                    <div className="mb-5 rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-900 dark:border-cyan-400/20 dark:bg-cyan-500/10 dark:text-cyan-200">
                      Preencha primeiro os dados do solicitante, equipamento,
                      criticidade, prioridade e a descrição da falha.
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      <Input
                        label="Número da OS"
                        value={os.numero}
                        onChange={(e) => updateOS("numero", e.target.value)}
                      />
                      <Input
                        label="Data"
                        type="date"
                        value={os.data}
                        onChange={(e) => updateOS("data", e.target.value)}
                      />
                      <Input
                        label="Hora"
                        type="time"
                        value={os.hora}
                        onChange={(e) => updateOS("hora", e.target.value)}
                      />
                      <Select
                        label="Status"
                        value={os.status}
                        onChange={(e) => updateOS("status", e.target.value)}
                        options={["Aberta", "Em execução", "Encerrada"]}
                      />

                      <Input
                        label="Setor"
                        value={os.setor}
                        onChange={(e) => updateOS("setor", e.target.value)}
                      />
                      <Input
                        label="Linha"
                        value={os.linha}
                        onChange={(e) => updateOS("linha", e.target.value)}
                      />
                      <Input
                        label="Solicitante"
                        value={os.solicitante}
                        onChange={(e) => updateOS("solicitante", e.target.value)}
                      />
                      <Input
                        label="Função do solicitante"
                        value={os.funcaoSolicitante}
                        onChange={(e) =>
                          updateOS("funcaoSolicitante", e.target.value)
                        }
                      />

                      <Input
                        label="Código do equipamento"
                        value={os.codigoEquipamento}
                        onChange={(e) =>
                          updateOS("codigoEquipamento", e.target.value)
                        }
                      />
                      <div className="md:col-span-2">
                        <Input
                          label="Nome do equipamento"
                          value={os.nomeEquipamento}
                          onChange={(e) =>
                            updateOS("nomeEquipamento", e.target.value)
                          }
                        />
                      </div>
                      <Select
                        label="Criticidade"
                        value={os.criticidade}
                        onChange={(e) => updateOS("criticidade", e.target.value)}
                        options={["Alta", "Média", "Baixa"]}
                      />
                      <Select
                        label="Prioridade"
                        value={os.prioridade}
                        onChange={(e) => updateOS("prioridade", e.target.value)}
                        options={["Urgente", "Imediato", "Sem urgência"]}
                      />

                      <Input
                        label="Anexo / referência"
                        value={os.anexo}
                        onChange={(e) => updateOS("anexo", e.target.value)}
                      />
                      <Select
                        label="Máquina liberada?"
                        value={os.maquinaLiberada}
                        onChange={(e) =>
                          updateOS("maquinaLiberada", e.target.value)
                        }
                        options={["Não", "Sim"]}
                      />

                      <div className="md:col-span-2 xl:col-span-4">
                        <TextArea
                          label="Descrição da falha / serviço solicitado"
                          value={os.descricaoFalha}
                          onChange={(e) =>
                            updateOS("descricaoFalha", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </SectionCard>
                </div>

                <div id="ordem-manutencao">
                  <SectionCard
                    title="Dados da Ordem de Manutenção"
                    subtitle="Preenchimento pela equipe de manutenção."
                    badge="Etapa 2"
                    badgeClass="bg-emerald-500/15 text-emerald-700 border border-emerald-400/20 dark:text-emerald-300"
                  >
                    <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-200">
                      Depois do atendimento, registre a causa do problema, o
                      serviço executado, o tempo parado e as observações finais.
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      <Input
                        label="Responsável técnico"
                        value={om.responsavel}
                        onChange={(e) => updateOM("responsavel", e.target.value)}
                      />
                      <Input
                        label="Equipe de apoio"
                        value={om.equipeApoio}
                        onChange={(e) => updateOM("equipeApoio", e.target.value)}
                      />
                      <Input
                        label="Data da execução"
                        type="date"
                        value={om.dataExecucao}
                        onChange={(e) =>
                          updateOM("dataExecucao", e.target.value)
                        }
                      />
                      <Select
                        label="Tipo de manutenção"
                        value={om.tipoManutencao}
                        onChange={(e) =>
                          updateOM("tipoManutencao", e.target.value)
                        }
                        options={["Corretiva", "Preventiva", "Preditiva"]}
                      />

                      <Input
                        label="Hora inicial"
                        type="time"
                        value={om.horaInicio}
                        onChange={(e) => updateOM("horaInicio", e.target.value)}
                      />
                      <Input
                        label="Hora final"
                        type="time"
                        value={om.horaFim}
                        onChange={(e) => updateOM("horaFim", e.target.value)}
                      />
                      <Select
                        label="Parada de produção"
                        value={om.paradaProducao}
                        onChange={(e) =>
                          updateOM("paradaProducao", e.target.value)
                        }
                        options={["Sim", "Não"]}
                      />
                      <Input
                        label="Tempo parado"
                        value={om.tempoParado}
                        onChange={(e) => updateOM("tempoParado", e.target.value)}
                      />

                      <div className="md:col-span-2 xl:col-span-4">
                        <TextArea
                          label="Causa do problema"
                          value={om.causaProblema}
                          onChange={(e) =>
                            updateOM("causaProblema", e.target.value)
                          }
                        />
                      </div>

                      <div className="md:col-span-2 xl:col-span-4">
                        <TextArea
                          label="Serviço realizado"
                          value={om.servicoRealizado}
                          onChange={(e) =>
                            updateOM("servicoRealizado", e.target.value)
                          }
                        />
                      </div>

                      <div className="md:col-span-2 xl:col-span-4">
                        <TextArea
                          label="Ação preventiva sugerida"
                          value={om.acaoPreventiva}
                          onChange={(e) =>
                            updateOM("acaoPreventiva", e.target.value)
                          }
                        />
                      </div>

                      <Select
                        label="Validação"
                        value={om.validacaoPCM}
                        onChange={(e) => updateOM("validacaoPCM", e.target.value)}
                        options={["Pendente", "Aprovado", "Revisar"]}
                      />

                      <div className="md:col-span-2 xl:col-span-3">
                        <TextArea
                          label="Observações finais"
                          value={om.observacoes}
                          onChange={(e) =>
                            updateOM("observacoes", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </SectionCard>
                </div>

                <div id="materiais">
                  <SectionCard
                    title="Materiais utilizados"
                    subtitle="Registro dos itens aplicados na manutenção."
                    badge="Custos"
                    badgeClass="bg-fuchsia-500/15 text-fuchsia-700 border border-fuchsia-400/20 dark:text-fuchsia-300"
                    action={
                      <button
                        onClick={addMaterial}
                        className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white/10 dark:hover:bg-white/15"
                      >
                        + Adicionar item
                      </button>
                    }
                  >
                    <div className="mb-5 rounded-2xl border border-fuchsia-200 bg-fuchsia-50 px-4 py-3 text-sm text-fuchsia-900 dark:border-fuchsia-400/20 dark:bg-fuchsia-500/10 dark:text-fuchsia-200">
                      Lance os materiais utilizados durante a execução para
                      calcular o custo total da ordem.
                    </div>

                    <div className="space-y-4">
                      {materiais.map((item, index) => {
                        const subtotal =
                          (Number(item.quantidade) || 0) *
                          (Number(item.custoUnitario) || 0);

                        return (
                          <div
                            key={index}
                            className="grid gap-4 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 transition hover:border-cyan-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-400/30 dark:hover:bg-white/[0.05]"
                          >
                            <div className="md:grid md:grid-cols-5 md:gap-4">
                              <div className="md:col-span-2">
                                <Input
                                  label="Descrição"
                                  value={item.descricao}
                                  onChange={(e) =>
                                    updateMaterial(
                                      index,
                                      "descricao",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>

                              <Input
                                label="Quantidade"
                                type="number"
                                value={item.quantidade}
                                onChange={(e) =>
                                  updateMaterial(
                                    index,
                                    "quantidade",
                                    e.target.value
                                  )
                                }
                              />

                              <Input
                                label="Custo unitário"
                                type="number"
                                value={item.custoUnitario}
                                onChange={(e) =>
                                  updateMaterial(
                                    index,
                                    "custoUnitario",
                                    e.target.value
                                  )
                                }
                              />

                              <div className="flex items-end">
                                <div className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-black/20">
                                  <p className="text-zinc-500 dark:text-zinc-400">
                                    Subtotal
                                  </p>
                                  <p className="mt-1 font-bold">
                                    R$ {subtotal.toFixed(2)}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-end">
                                <button
                                  onClick={() => removeMaterial(index)}
                                  className="w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
                                >
                                  Remover
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </SectionCard>
                </div>
              </div>

              <div className="space-y-8">
                <PanelCard title="Resumo da ordem">
                  <SummaryRow label="OS" value={os.numero} />
                  <SummaryRow
                    label="Equipamento"
                    value={os.nomeEquipamento || "-"}
                  />
                  <SummaryRow
                    label="Código"
                    value={os.codigoEquipamento || "-"}
                  />
                  <SummaryRow label="Setor" value={os.setor} />
                  <SummaryRow label="Linha" value={os.linha} />
                  <SummaryRow label="Criticidade" value={os.criticidade} />
                  <SummaryRow label="Prioridade" value={os.prioridade} />
                </PanelCard>

                <PanelCard title="Indicadores rápidos">
                  <KpiBox label="Itens lançados" value={String(totalItens)} />
                  <KpiBox
                    label="Tipos de material"
                    value={String(materiais.length)}
                  />
                  <KpiBox
                    label="Parada de produção"
                    value={om.paradaProducao}
                  />
                  <KpiBox
                    label="Tempo parado"
                    value={om.tempoParado || "Não informado"}
                  />
                </PanelCard>

                <div id="validacao">
                  <PanelCard title="Status da ordem">
                    <div className="space-y-3">
                      <BadgeLine
                        label="Status atual"
                        badge={statusBadge(os.status)}
                      />
                      <BadgeLine
                        label="Prioridade"
                        badge={priorityBadge(os.prioridade)}
                      />
                      <BadgeLine
                        label="Validação"
                        badge={approvalBadge(om.validacaoPCM)}
                      />
                      <BadgeLine
                        label="Máquina liberada"
                        badge={machineBadge(os.maquinaLiberada)}
                      />
                    </div>
                  </PanelCard>
                </div>

                <PanelCard title="Como usar esta tela">
                  <ul className="space-y-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    <li>1. Preencha primeiro a Ordem de Serviço.</li>
                    <li>
                      2. Em seguida, registre a execução da manutenção na OM.
                    </li>
                    <li>
                      3. Lance os materiais utilizados para formar o custo final.
                    </li>
                    <li>
                      4. Revise os status e finalize a validação da ordem.
                    </li>
                  </ul>
                </PanelCard>
              </div>
            </div>
          </main>

          <footer className="mt-10 border-t border-zinc-200 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <div className="mx-auto max-w-7xl px-6 py-8">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 font-bold text-black shadow-[0_10px_25px_rgba(34,211,238,0.22)] dark:text-white">
                      PM
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                        Sistema de Ordens de Manutenção
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Proposta visual para apoio ao processo de manutenção
                        industrial.
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    Este protótipo foi desenvolvido para demonstrar uma interface
                    amigável de abertura e acompanhamento de Ordens de Serviço e
                    Ordens de Manutenção, com foco em clareza, usabilidade,
                    organização das informações e apoio ao controle do processo.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                    Recursos do projeto
                  </h4>
                  <ul className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                    <li>• Cadastro de Ordem de Serviço</li>
                    <li>• Registro da Ordem de Manutenção</li>
                    <li>• Controle de materiais e custos</li>
                    <li>• Validação e liberação do equipamento</li>
                    <li>• Alternância entre tema claro e escuro</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                    Informações da entrega
                  </h4>
                  <div className="mt-4 space-y-3 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-white/10 dark:bg-black/20">
                    <FooterInfo
                      label="Atividade"
                      value="Atividade Avaliativa 02"
                    />
                    <FooterInfo
                      label="Tema"
                      value="OS + OM em interface amigável"
                    />
                    <FooterInfo
                      label="Tipo"
                      value="Protótipo front-end original"
                    />
                    <FooterInfo
                      label="Status"
                      value="Pronto para apresentação"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 border-t border-zinc-200 pt-5 text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400 md:flex-row md:items-center md:justify-between">
                <p>
                  Desenvolvido como proposta acadêmica de interface para
                  manutenção industrial.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs dark:border-white/10 dark:bg-white/5">
                    UI amigável
                  </span>
                  <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs dark:border-white/10 dark:bg-white/5">
                    Responsivo
                  </span>
                  <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs dark:border-white/10 dark:bg-white/5">
                    Visual corporativo
                  </span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

function MenuItem({ label, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
        active
          ? "bg-cyan-500 text-black shadow-[0_0_30px_rgba(34,211,238,0.25)]"
          : "text-zinc-700 hover:bg-zinc-100 hover:text-black dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

function FlowStep({ number, title }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500 font-bold text-black shadow-[0_0_20px_rgba(34,211,238,0.3)]">
        {number}
      </div>
      <p className="text-sm text-zinc-700 dark:text-zinc-300">{title}</p>
    </div>
  );
}

function InfoCard({ title, text }) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none dark:hover:bg-white/[0.06]">
      <h3 className="text-base font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {text}
      </p>
    </div>
  );
}

function StatCard({ title, value, badge, glow = "cyan" }) {
  const glowMap = {
    cyan: "dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_0_30px_rgba(34,211,238,0.08)]",
    blue: "dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_0_30px_rgba(59,130,246,0.08)]",
    red: "dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_0_30px_rgba(239,68,68,0.08)]",
    emerald:
      "dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_0_30px_rgba(16,185,129,0.08)]",
  };

  return (
    <div
      className={`rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:backdrop-blur-xl ${glowMap[glow]}`}
    >
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        {title}
      </p>
      <div className="mt-3 flex items-center justify-between gap-3">
        <h3 className="text-2xl font-bold">{value}</h3>
        {badge}
      </div>
    </div>
  );
}

function SectionCard({
  title,
  subtitle,
  badge,
  badgeClass,
  children,
  action,
}) {
  return (
    <section className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:shadow-2xl dark:backdrop-blur-xl">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {action}
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}
          >
            {badge}
          </span>
        </div>
      </div>
      {children}
    </section>
  );
}

function PanelCard({ title, children }) {
  return (
    <section className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:shadow-2xl dark:backdrop-blur-xl">
      <h3 className="text-lg font-bold">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-200 py-3 last:border-0 dark:border-white/10">
      <span className="text-sm text-zinc-500 dark:text-zinc-400">{label}</span>
      <span className="max-w-[60%] text-right text-sm font-semibold">
        {value}
      </span>
    </div>
  );
}

function KpiBox({ label, value }) {
  return (
    <div className="mb-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 last:mb-0 transition hover:border-cyan-300 hover:bg-white dark:border-white/10 dark:bg-black/20 dark:hover:border-cyan-400/20 dark:hover:bg-black/30">
      <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">
        {label}
      </p>
      <p className="mt-2 text-xl font-bold">{value}</p>
    </div>
  );
}

function BadgeLine({ label, badge }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-white/10 dark:bg-black/20">
      <span className="text-sm text-zinc-600 dark:text-zinc-400">{label}</span>
      {badge}
    </div>
  );
}

function MiniHeaderStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-left shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none">
      <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

function FooterInfo({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-zinc-200 py-2 last:border-0 dark:border-white/10">
      <span className="text-zinc-500 dark:text-zinc-400">{label}</span>
      <span className="text-right font-medium text-zinc-900 dark:text-white">
        {value}
      </span>
    </div>
  );
}

function statusBadge(status) {
  const map = {
    Aberta:
      "bg-amber-500/15 text-amber-700 border border-amber-400/20 dark:text-amber-300 animate-pulse",
    "Em execução":
      "bg-blue-500/15 text-blue-700 border border-blue-400/20 dark:text-blue-300 animate-pulse",
    Encerrada:
      "bg-emerald-500/15 text-emerald-700 border border-emerald-400/20 dark:text-emerald-300",
  };
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
        map[status] ||
        "bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-white/10 dark:text-white dark:border-white/10"
      }`}
    >
      {status}
    </span>
  );
}

function priorityBadge(priority) {
  const map = {
    Urgente:
      "bg-red-500/15 text-red-700 border border-red-400/20 dark:text-red-300 dark:shadow-[0_0_15px_rgba(239,68,68,0.15)]",
    Imediato:
      "bg-yellow-500/15 text-yellow-700 border border-yellow-400/20 dark:text-yellow-300",
    "Sem urgência":
      "bg-zinc-200 text-zinc-700 border border-zinc-300 dark:bg-zinc-500/15 dark:text-zinc-300 dark:border-zinc-400/20",
  };
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
        map[priority] ||
        "bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-white/10 dark:text-white dark:border-white/10"
      }`}
    >
      {priority}
    </span>
  );
}

function approvalBadge(value) {
  const map = {
    Pendente:
      "bg-amber-500/15 text-amber-700 border border-amber-400/20 dark:text-amber-300",
    Aprovado:
      "bg-emerald-500/15 text-emerald-700 border border-emerald-400/20 dark:text-emerald-300",
    Revisar:
      "bg-red-500/15 text-red-700 border border-red-400/20 dark:text-red-300",
  };
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
        map[value] ||
        "bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-white/10 dark:text-white dark:border-white/10"
      }`}
    >
      {value}
    </span>
  );
}

function machineBadge(value) {
  const map = {
    Sim: "bg-emerald-500/15 text-emerald-700 border border-emerald-400/20 dark:text-emerald-300",
    Não: "bg-red-500/15 text-red-700 border border-red-400/20 dark:text-red-300",
  };
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
        map[value] ||
        "bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-white/10 dark:text-white dark:border-white/10"
      }`}
    >
      {value}
    </span>
  );
}

function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-400/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-cyan-400/40 dark:focus:bg-black/30"
      />
    </label>
  );
}

function Select({ label, options = [], ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </span>
      <select
        {...props}
        className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-400/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:focus:border-cyan-400/40 dark:focus:bg-black/30"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white"
          >
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextArea({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </span>
      <textarea
        {...props}
        rows={4}
        className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-400/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-cyan-400/40 dark:focus:bg-black/30"
      />
    </label>
  );
}

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="4" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z"
      />
    </svg>
  );
}