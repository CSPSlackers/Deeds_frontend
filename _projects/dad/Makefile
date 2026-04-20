# Makefile
# DAD Project Configuration
# Called from main Makefile via: make -C _projects/dad <target>

###########################################
# DAD Project Configuration
###########################################

# Project paths (relative to workspace root)
DATE_OF_CREATION = 2026-04-13
PROJECT_SRC = $(CURDIR)
PROJECT_NAME = $(notdir $(PROJECT_SRC))

# Workspace root (main Makefile directory - two levels up from here)
WORKSPACE_ROOT = ../..

# Distribution destinations (relative to workspace root, in .gitignore)
ROOT_DEST = $(WORKSPACE_ROOT)
API_DEST = $(WORKSPACE_ROOT)/assets/js/projects/$(PROJECT_NAME)/api
IMAGES_DEST = $(WORKSPACE_ROOT)/images/projects/$(PROJECT_NAME)
PAGES_HTML_DEST = $(WORKSPACE_ROOT)/assets/html/projects/$(PROJECT_NAME)
DOCS_DEST = $(WORKSPACE_ROOT)/_posts/projects/$(PROJECT_NAME)

###########################################
# Build Targets
###########################################

# Main build target - copy API modules and assets
build:
	@$(MAKE) assets
	@echo "✅ $(PROJECT_NAME) built successfully"
	@echo "   Source: _projects/$(PROJECT_NAME)/"
	@echo "   Pages: Root (index.html, login.html, etc.)"
	@echo "   API: assets/js/projects/$(PROJECT_NAME)/api/"
	@echo "   Images: images/projects/$(PROJECT_NAME)/"

# Copy HTML pages to root, API modules, and image assets
assets:
	@cp pages/html/*.html $(ROOT_DEST)/ 2>/dev/null || true
	@mkdir -p $(API_DEST)
	@cp api/*.js $(API_DEST)/ 2>/dev/null || true
	@mkdir -p $(IMAGES_DEST)
	@cp -r images/* $(IMAGES_DEST)/ 2>/dev/null || true

# Clean distributed files (keeps source intact)
clean:
	@echo "🧹 Cleaning $(PROJECT_NAME) distribution..."
	@rm -f $(ROOT_DEST)/index.html $(ROOT_DEST)/login.html $(ROOT_DEST)/chat_user.html $(ROOT_DEST)/chat_admin.html $(ROOT_DEST)/public-submit.html $(ROOT_DEST)/program1.html $(ROOT_DEST)/program2.html $(ROOT_DEST)/program3.html $(ROOT_DEST)/program4.html $(ROOT_DEST)/program5.html $(ROOT_DEST)/program6.html
	@rm -rf $(API_DEST)
	@rm -rf $(IMAGES_DEST)
	@echo "✓ $(PROJECT_NAME) cleaned"

# Watch for changes and rebuild
watch:
	@echo "👀 Watching $(PROJECT_NAME) for changes..."
	@while true; do \
		find api images pages/html -newer .watch-marker 2>/dev/null | grep -q . && \
		$(MAKE) assets && touch .watch-marker && \
		echo "♻️  Rebuilt at $$(date '+%H:%M:%S')"; \
		sleep 1; \
	done

.PHONY: build assets clean watch
