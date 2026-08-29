const Footer = () => {
    return (
        <footer className="border-t border-border/50 bg-background px-4 py-6">

            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">

                {/* Left: Brand */}
                <h1 className="gradient-text text-lg sm:text-xl font-semibold tracking-tight">
                    JobPortal
                </h1>

                {/* Center: Links */}
                <div className="flex flex-col justify-center items-center">
                    {/* Trust line */}
                    <p className="text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed">
                        No fake listings • Verified jobs • Built for real job seekers
                    </p>
                    <div className="flex items-center gap-4">
                        <a className="hover:text-primary transition-colors">Privacy</a>
                        <a className="hover:text-primary transition-colors">Terms</a>
                        <a className="hover:text-primary transition-colors">Contact</a>
                    </div>
                </div>

                {/* Right: Copyright */}
                <p className="text-xs sm:text-sm text-muted-foreground/70">
                    © {new Date().getFullYear()} JobPortal
                </p>

            </div>

        </footer>
    );
};

export default Footer;