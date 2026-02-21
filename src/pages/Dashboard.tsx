const Dashboard = () => {
  return (
    <div>
      <h1 className="font-serif text-3xl text-foreground mb-2">Hello 👋</h1>
      <p className="text-muted-foreground mb-8">Welcome to the Materia Portal</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Preferences",
            description: "Configure your workspace fields, specialties, and optimization focus.",
            cta: "Open preferences",
            gradient: "from-forest to-sage",
          },
          {
            title: "Chat",
            description: "Ask questions and get AI-powered material recommendations.",
            cta: "Start chatting",
            gradient: "from-sage to-forest-light",
          },
          {
            title: "Dashboard",
            description: "View analytics and insights for your material selections.",
            cta: "View dashboard",
            gradient: "from-forest-light to-forest",
          },
          {
            title: "Materials",
            description: "Browse and compare sustainable materials for your projects.",
            cta: "Browse materials",
            gradient: "from-sage to-forest",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-xl border border-border bg-card overflow-hidden flex flex-col"
          >
            <div className={`h-32 bg-gradient-to-br ${card.gradient} opacity-80`} />
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-semibold text-foreground mb-1">{card.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{card.description}</p>
              <button className="self-start px-4 py-2 text-sm rounded-lg border border-border text-foreground hover:bg-accent transition-colors">
                {card.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
