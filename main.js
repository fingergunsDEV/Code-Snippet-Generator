import 'prismjs';
import { config } from './config.js';

// Template definitions with variables and categories
const templates = {
    'react-component': {
        name: 'React Component',
        template: `import React from 'react';

interface {{componentName}}Props {
    {{props}}
}

export const {{componentName}}: React.FC<{{componentName}}Props> = ({ {{destructuredProps}} }) => {
    return (
        <div>
            {{content}}
        </div>
    );
};`,
        variables: {
            componentName: { label: 'Component Name', default: 'MyComponent' },
            props: { label: 'Props Interface', default: 'title: string;\n    description?: string;' },
            destructuredProps: { label: 'Destructured Props', default: 'title, description' },
            content: { label: 'Component Content', default: '<h1>{title}</h1>\n            {description && <p>{description}</p>}' }
        },
        category: 'content'
    },
    'api-endpoint': {
        name: 'API Endpoint',
        template: `export async function {{methodName}}(req: Request): Promise<Response> {
    try {
        const { {{params}} } = await req.json();
        
        {{logic}}

        {{externalApiCall}}

        return new Response(JSON.stringify({ {{response}} }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
}`,
        variables: {
            methodName: { label: 'Method Name', default: 'handleRequest' },
            params: { label: 'Request Parameters', default: 'id, data' },
            logic: { label: 'Business Logic', default: 'const result = await database.query(id);\nconst processed = await processData(result, data);' },
            externalApiCall: { label: 'External API Call', default: '// Call external API\nconst externalApiUrl = "{{externalUrl}}";\nconst externalResponse = await fetch(externalApiUrl, {\n  method: "POST",\n  headers: {\n    "Content-Type": "application/json",\n    "Authorization": "Bearer {{apiKey}}"\n  },\n  body: JSON.stringify({ id, processed })\n});\n\nif (!externalResponse.ok) {\n  throw new Error(`External API error: ${externalResponse.status}`);\n}\n\nconst externalData = await externalResponse.json();' },
            response: { label: 'Response Data', default: 'success: true, data: processed, externalData' },
            externalUrl: { label: 'External API URL', default: 'https://api.example.com/endpoint' },
            apiKey: { label: 'API Key', default: 'YOUR_API_KEY' }
        },
        category: 'api'
    },
    'html-structure': {
        name: 'HTML Page Template',
        template: `<!DOCTYPE html>
<html lang="{{language}}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{{description}}">
    <title>{{title}}</title>
    <link rel="stylesheet" href="{{cssFile}}">
</head>
<body>
    <header>
        <h1>{{headerTitle}}</h1>
        {{navigation}}
    </header>

    <main>
        {{mainContent}}
    </main>

    <footer>
        {{footerContent}}
    </footer>
    
    <script src="{{jsFile}}"></script>
</body>
</html>`,
        variables: {
            language: { label: 'Document Language', default: 'en' },
            description: { label: 'Meta Description', default: 'My awesome website' },
            title: { label: 'Page Title', default: 'My Website' },
            cssFile: { label: 'CSS Filename', default: 'styles.css' },
            headerTitle: { label: 'Header Title', default: 'Welcome to My Website' },
            navigation: { label: 'Navigation HTML', default: '<nav>\n    <ul>\n        <li><a href="#">Home</a></li>\n        <li><a href="#">About</a></li>\n        <li><a href="#">Contact</a></li>\n    </ul>\n</nav>' },
            mainContent: { label: 'Main Content', default: '<section>\n    <h2>Welcome</h2>\n    <p>This is the main content of my website.</p>\n</section>' },
            footerContent: { label: 'Footer Content', default: '&copy; 2023 My Website. All rights reserved.' },
            jsFile: { label: 'JavaScript Filename', default: 'main.js' }
        },
        category: 'content'
    },
    'css-component': {
        name: 'CSS Component',
        template: `.{{className}} {
    display: {{display}};
    color: {{textColor}};
    background-color: {{backgroundColor}};
    padding: {{padding}};
    margin: {{margin}};
    border-radius: {{borderRadius}};
    {{additionalStyles}}
}

@media (max-width: 768px) {
    .{{className}} {
        {{responsiveStyles}}
`,
        variables: {
            className: { label: 'Class Name', default: 'card' },
            display: { label: 'Display', default: 'flex' },
            textColor: { label: 'Text Color', default: '#333' },
            backgroundColor: { label: 'Background Color', default: '#fff' },
            padding: { label: 'Padding', default: '1rem' },
            margin: { label: 'Margin', default: '0.5rem' },
            borderRadius: { label: 'Border Radius', default: '4px' },
            additionalStyles: { label: 'Additional Styles', default: 'box-shadow: 0 2px 5px rgba(0,0,0,0.1);\nfont-family: sans-serif;' },
            responsiveStyles: { label: 'Responsive Styles', default: 'flex-direction: column;\npadding: 0.5rem;' }
        },
        category: 'ui-components'
    },
    'markdown-document': {
        name: 'Markdown Document',
        template: `# {{title}}

## {{subtitle}}

{{description}}

### Features

{{features}}

## Installation

\`\`\`bash
{{installCommand}}
\`\`\`

## Usage

\`\`\`{{language}}
{{usageExample}}
\`\`\`

## {{additionalSectionTitle}}

{{additionalSectionContent}}

## License

{{license}}`,
        variables: {
            title: { label: 'Title', default: 'Project Name' },
            subtitle: { label: 'Subtitle', default: 'A brief description' },
            description: { label: 'Description', default: 'This is a detailed description of what this project does and its benefits.' },
            features: { label: 'Features List', default: '- Feature 1\n- Feature 2\n- Feature 3' },
            installCommand: { label: 'Installation Command', default: 'npm install my-package' },
            language: { label: 'Code Block Language', default: 'javascript' },
            usageExample: { label: 'Usage Example', default: 'import { myFunction } from \'my-package\';\n\nconst result = myFunction();\nconsole.log(result);' },
            additionalSectionTitle: { label: 'Additional Section Title', default: 'Configuration' },
            additionalSectionContent: { label: 'Additional Section Content', default: 'Customize the behavior with these options:\n\n```json\n{\n  "option1": true,\n  "option2": "value"\n}\n```' },
            license: { label: 'License', default: 'MIT \u00a9 Your Name' }
        },
        category: 'content'
    },
    'blog-post': {
        name: 'Blog Post Template',
        template: `---
title: "{{title}}"
date: "{{date}}"
author: "{{author}}"
tags: [{{tags}}]
excerpt: "{{excerpt}}"
---

# {{title}}

![{{imageAlt}}]({{imageUrl}})

{{introduction}}

## {{section1Title}}

{{section1Content}}

## {{section2Title}}

{{section2Content}}

### {{subsectionTitle}}

{{subsectionContent}}

> {{quote}}

## Conclusion

{{conclusion}}

---

*{{footnote}}*`,
        variables: {
            title: { label: 'Post Title', default: 'How to Create Amazing Content' },
            date: { label: 'Publication Date', default: new Date().toISOString().split('T')[0] },
            author: { label: 'Author Name', default: 'John Doe' },
            tags: { label: 'Tags (comma separated)', default: 'content, tutorial, tips' },
            excerpt: { label: 'Brief Excerpt', default: 'Learn how to create engaging content that resonates with your audience.' },
            imageAlt: { label: 'Image Alt Text', default: 'Person writing content' },
            imageUrl: { label: 'Image URL', default: '/images/content-creation.jpg' },
            introduction: { label: 'Introduction Paragraph', default: 'Creating quality content is essential for engaging your audience. In this post, we\'ll explore proven strategies to help you craft compelling content that resonates with readers.' },
            section1Title: { label: 'First Section Title', default: 'Understanding Your Audience' },
            section1Content: { label: 'First Section Content', default: 'Before creating content, it\'s crucial to understand who you\'re writing for. Research your audience\'s needs, preferences, and pain points to tailor your message effectively.' },
            section2Title: { label: 'Second Section Title', default: 'Crafting Compelling Headlines' },
            section2Content: { label: 'Second Section Content', default: 'Headlines are your first opportunity to grab attention. A good headline is clear, specific, and creates curiosity or promises value.' },
            subsectionTitle: { label: 'Subsection Title', default: 'Headline Formulas That Work' },
            subsectionContent: { label: 'Subsection Content', default: 'Some effective headline structures include "How to [Achieve Benefit]", "X Ways to [Solve Problem]", and "The Ultimate Guide to [Topic]".' },
            quote: { label: 'Notable Quote', default: 'Good content isn\'t about good writing. It\'s about good thinking.' },
            conclusion: { label: 'Conclusion', default: 'By implementing these strategies, you\'ll be able to create content that not only attracts readers but keeps them engaged and coming back for more.' },
            footnote: { label: 'Footnote', default: 'Published in Content Creation Monthly, Issue 45' }
        },
        category: 'content'
    },
    'json-schema': {
        name: 'JSON Schema',
        template: `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "{{title}}",
  "description": "{{description}}",
  "type": "object",
  "properties": {
    {{properties}}
  },
  "required": [{{requiredFields}}]
}`,
        variables: {
            title: { label: 'Schema Title', default: 'User' },
            description: { label: 'Schema Description', default: 'A schema describing a user object' },
            properties: { label: 'Properties', default: '"id": {\n      "type": "integer",\n      "description": "The unique identifier"\n    },\n    "name": {\n      "type": "string",\n      "description": "User\'s full name"\n    },\n    "email": {\n      "type": "string",\n      "format": "email",\n      "description": "User\'s email address"\n    },\n    "role": {\n      "type": "string",\n      "enum": ["admin", "user", "guest"],\n      "default": "user",\n      "description": "User\'s role in the system"\n    }' },
            requiredFields: { label: 'Required Fields', default: '"id", "name", "email"' }
        },
        category: 'api'
    },
    'analytics-report': {
        name: 'Analytics Report',
        template: `# {{reportTitle}} - {{dateRange}}

## Executive Summary
{{executiveSummary}}

## Key Performance Metrics

| Metric | Current | Previous | Change |
|--------|---------|----------|--------|
{{keyMetricsTable}}

## Traffic Sources
- Organic Search: {{organicTraffic}}%
- Direct: {{directTraffic}}%
- Referral: {{referralTraffic}}%
- Social: {{socialTraffic}}%
- Paid: {{paidTraffic}}%

## User Engagement
{{userEngagementAnalysis}}

## Content Performance
{{topPerformingContent}}

## Recommendations
{{recommendations}}

*Report generated on {{generationDate}} by {{analyst}}*`,
        variables: {
            reportTitle: { label: 'Report Title', default: 'Monthly Website Analytics Report' },
            dateRange: { label: 'Date Range', default: 'January 1-31, 2023' },
            executiveSummary: { label: 'Executive Summary', default: 'This month we observed a 12% increase in overall traffic with significant growth in mobile users. Conversion rate improved by 2.5% compared to last month.' },
            keyMetricsTable: { label: 'Key Metrics Table', default: '| Users | 45,230 | 40,120 | +12.7% |\n| Sessions | 62,480 | 53,950 | +15.8% |\n| Bounce Rate | 52% | 58% | -6% |\n| Conversion Rate | 3.8% | 3.2% | +0.6% |' },
            organicTraffic: { label: 'Organic Traffic %', default: '42' },
            directTraffic: { label: 'Direct Traffic %', default: '28' },
            referralTraffic: { label: 'Referral Traffic %', default: '15' },
            socialTraffic: { label: 'Social Traffic %', default: '10' },
            paidTraffic: { label: 'Paid Traffic %', default: '5' },
            userEngagementAnalysis: { label: 'User Engagement Analysis', default: '- Average session duration: 2:34 (up 18 seconds)\n- Pages per session: 2.8 (up 0.3)\n- Most engaged audience: 25-34 age group from metropolitan areas' },
            topPerformingContent: { label: 'Top Performing Content', default: '1. "/blog/top-10-tips" - 12,450 pageviews\n2. "/product/featured" - 8,720 pageviews\n3. "/resources/guide" - 6,340 pageviews' },
            recommendations: { label: 'Recommendations', default: '1. Optimize mobile checkout flow to reduce abandonment\n2. Increase content production for the blog section\n3. Allocate more budget to Facebook ads based on high conversion rate' },
            generationDate: { label: 'Generation Date', default: new Date().toLocaleDateString() },
            analyst: { label: 'Analyst Name', default: 'Marketing Analytics Team' }
        },
        category: 'reports'
    },
    'financial-report': {
        name: 'Financial Report',
        template: `# {{companyName}} - {{reportType}}

## {{period}}

### Financial Highlights
{{highlights}}

### Revenue Breakdown
\`\`\`
{{revenueBreakdown}}
\`\`\`

### Expense Analysis
\`\`\`
{{expenseAnalysis}}
\`\`\`

### Profit & Loss Summary
| Item | Amount | % Change |
|------|--------|----------|
{{plSummary}}

### Cash Flow
{{cashFlowAnalysis}}

### Projections
{{projections}}

### Notes
{{notes}}

Prepared by: {{preparedBy}}
Date: {{prepDate}}`,
        variables: {
            companyName: { label: 'Company Name', default: 'Acme Corporation' },
            reportType: { label: 'Report Type', default: 'Quarterly Financial Report' },
            period: { label: 'Period', default: 'Q1 2023 (January - March)' },
            highlights: { label: 'Financial Highlights', default: '- Revenue increased by 15% compared to previous quarter\n- Gross margin improved to 42%\n- Operating expenses reduced by 5%\n- EBITDA grew by 22%' },
            revenueBreakdown: { label: 'Revenue Breakdown', default: 'Product Sales:    $1,245,000  (65%)\nSubscriptions:    $532,000   (28%)\nServices:         $134,000   (7%)\n---------------------------------\nTotal Revenue:   $1,911,000  (100%)' },
            expenseAnalysis: { label: 'Expense Analysis', default: 'Cost of Goods:    $1,108,380  (58%)\nR&D:              $191,100   (10%)\nSales & Marketing: $248,430   (13%)\nG&A:              $153,000   (8%)\n---------------------------------\nTotal Expenses:  $1,700,910  (89%)' },
            plSummary: { label: 'P&L Summary', default: '| Revenue | $1,911,000 | +15% |\n| Expenses | $1,700,910 | +10% |\n| Profit | $210,090 | +68% |' },
            cashFlowAnalysis: { label: 'Cash Flow Analysis', default: '- Opening balance: $1,450,000\n- Operating cash flow: +$320,000\n- Investing cash flow: -$150,000\n- Financing cash flow: -$75,000\n- Net change: +$95,000\n- Closing balance: $1,545,000' },
            projections: { label: 'Projections', default: 'Based on current trends, we project a 12-15% growth in revenue for Q2 2023, with profit margins expected to increase by 1-2 percentage points due to economies of scale and continued efficiency measures.' },
            notes: { label: 'Notes', default: '1. The company secured a new credit facility of $2M with a reduced interest rate.\n2. Capital expenditures are expected to increase in Q2 due to planned technology infrastructure upgrades.\n3. Foreign exchange fluctuations had a minimal impact on financial results.' },
            preparedBy: { label: 'Prepared By', default: 'Finance Department' },
            prepDate: { label: 'Preparation Date', default: new Date().toLocaleDateString() }
        },
        category: 'reports'
    },
    'email-newsletter': {
        name: 'Email Newsletter',
        template: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{emailSubject}}</title>
    <style>
        /* existing styles */
    </style>
</head>
<body>
    <!-- existing content -->
</body>
</html>`,
        variables: {
            emailSubject: { label: 'Email Subject', default: 'Your Weekly Newsletter - Latest Updates' },
            newsletterName: { label: 'Newsletter Name', default: 'Company Newsletter' },
            issueDate: { label: 'Issue Date', default: new Date().toLocaleDateString() },
            primaryColor: { label: 'Primary Color', default: '#3366cc' },
            greeting: { label: 'Greeting', default: 'Hello there,' },
            mainHeadline: { label: 'Main Headline', default: 'This Week\'s Highlights' },
            mainContent: { label: 'Main Content', default: '<p>We\'re excited to share our latest updates with you. This week has been filled with new developments and exciting opportunities.</p><p>Our team has been working hard on delivering the best experience for our valued customers like you.</p>' },
            ctaText: { label: 'CTA Button Text', default: 'Read More' },
            ctaLink: { label: 'CTA Link URL', default: 'https://example.com/news' },
            secondaryHeadline: { label: 'Secondary Headline', default: 'Upcoming Events' },
            secondaryContent: { label: 'Secondary Content', default: '<p>Join us for our upcoming webinar on product innovations, scheduled for next week. Seats are limited, so register early!</p>' },
            companyInfo: { label: 'Company Information', default: ' 2023 Company Name. All rights reserved.<br>123 Business Street, City, Country' },
            unsubscribeText: { label: 'Unsubscribe Text', default: 'If you no longer wish to receive these emails, you can' },
            unsubscribeLink: { label: 'Unsubscribe Link', default: 'https://example.com/unsubscribe' }
        },
        category: 'email'
    },
    'product-announcement': {
        name: 'Product Announcement Email',
        template: `<!-- existing template -->`,
        variables: {
            // existing variables
        },
        category: 'email'
    },
    'navbar-component': {
        name: 'Navigation Bar',
        template: `<!-- existing template -->`,
        variables: {
            // existing variables
        },
        category: 'ui-components'
    },
    'sidebar-navigation': {
        name: 'Sidebar Navigation',
        template: `<!-- existing template -->`,
        variables: {
            // existing variables
        },
        category: 'ui-components'
    },
    'mega-menu': {
        name: 'Mega Menu Navigation',
        template: `<!-- existing template -->`,
        variables: {
            // existing variables
        },
        category: 'ui-components'
    }
};

class SnippetGenerator {
    constructor() {
        this.templateSelect = document.getElementById('template-select');
        this.variableInputs = document.getElementById('variable-inputs');
        this.preview = document.getElementById('preview');
        this.copyBtn = document.getElementById('copy-btn');
        this.previewIframe = document.getElementById('preview-iframe');
        this.deviceButtons = document.querySelectorAll('.device-button');
        this.sidebar = document.getElementById('sidebar');
        this.sidebarToggle = document.getElementById('sidebar-toggle');
        this.sidebarClose = document.getElementById('sidebar-close');
        this.categoryFilter = document.getElementById('category-filter');
        this.componentBuilder = document.getElementById('component-builder');
        this.savedComponents = document.getElementById('saved-components');
        this.previewTabs = document.querySelectorAll('.preview-tab');

        this.components = JSON.parse(localStorage.getItem('savedComponents')) || [];
        this.initializeCategoryFilter();
        this.initializeTemplateOptions();
        this.bindEvents();
        this.loadSavedComponents();

        // Set default template if available
        if (this.templateSelect.options.length > 1) {
            this.templateSelect.selectedIndex = 1;
            this.handleTemplateChange();
        }
    }

    initializeCategoryFilter() {
        config.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            this.categoryFilter.appendChild(option);
        });

        this.categoryFilter.addEventListener('change', () => this.filterTemplatesByCategory());
    }

    initializeTemplateOptions() {
        // Clear existing options except the first default one
        while (this.templateSelect.options.length > 1) {
            this.templateSelect.remove(1);
        }

        Object.entries(templates).forEach(([key, template]) => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = template.name;
            option.dataset.category = template.category || config.defaultCategory;
            this.templateSelect.appendChild(option);
        });
    }

    filterTemplatesByCategory() {
        const category = this.categoryFilter.value;
        const options = this.templateSelect.querySelectorAll('option');

        options.forEach(option => {
            if (option.value === '') return; // Skip the first default option
            if (category === 'all' || option.dataset.category === category) {
                option.style.display = '';
            } else {
                option.style.display = 'none';
            }
        });

        // Reset selection if current selection is not visible
        const selectedOption = this.templateSelect.options[this.templateSelect.selectedIndex];
        if (selectedOption && selectedOption.style.display === 'none') {
            this.templateSelect.selectedIndex = 0;
            this.variableInputs.innerHTML = '';
            this.preview.textContent = '';
        }
    }

    bindEvents() {
        this.templateSelect.addEventListener('change', () => this.handleTemplateChange());
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        
        // Add toggle functionality for sidebar
        this.sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        this.sidebarClose.addEventListener('click', () => this.closeSidebar());
        
        // Add event listeners for device buttons
        this.deviceButtons.forEach(button => {
            button.addEventListener('click', () => this.changePreviewDevice(button.dataset.device));
        });

        this.previewTabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchPreviewTab(tab.dataset.tab));
        });

        document.getElementById('save-component').addEventListener('click', () => this.saveComponent());
        document.getElementById('clear-builder').addEventListener('click', () => this.clearBuilder());
        document.getElementById('add-to-builder').addEventListener('click', () => this.addToBuilder());
    }

    switchPreviewTab(tabName) {
        const tabContents = document.querySelectorAll('.tab-content');
        const tabs = document.querySelectorAll('.preview-tab');

        tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.tab === tabName));
        tabContents.forEach(content => {
            content.style.display = content.dataset.tab === tabName ? 'block' : 'none';
        });
    }

    saveComponent() {
        const name = prompt('Enter a name for this component:');
        if (!name) return;

        const component = {
            id: Date.now(),
            name,
            code: this.componentBuilder.innerHTML
        };

        this.components.push(component);
        localStorage.setItem('savedComponents', JSON.stringify(this.components));
        this.loadSavedComponents();
    }

    loadSavedComponents() {
        this.savedComponents.innerHTML = '';

        if (this.components.length === 0) {
            this.savedComponents.innerHTML = '<p>No saved components yet.</p>';
            return;
        }

        this.components.forEach(component => {
            const componentEl = document.createElement('div');
            componentEl.className = 'saved-component';
            componentEl.innerHTML = `
                <h4>${component.name}</h4>
                <div class="saved-component-actions">
                    <button class="use-component" data-id="${component.id}">Use</button>
                    <button class="delete-component" data-id="${component.id}">Delete</button>
                </div>
            `;
            this.savedComponents.appendChild(componentEl);
        });

        this.savedComponents.querySelectorAll('.use-component').forEach(button => {
            button.addEventListener('click', () => this.useComponent(button.dataset.id));
        });

        this.savedComponents.querySelectorAll('.delete-component').forEach(button => {
            button.addEventListener('click', () => this.deleteComponent(button.dataset.id));
        });
    }

    useComponent(id) {
        const component = this.components.find(c => c.id === parseInt(id));
        if (component) {
            this.componentBuilder.innerHTML = component.code;
            this.updateBuilderPreview();
        }
    }

    deleteComponent(id) {
        if (confirm('Are you sure you want to delete this component?')) {
            this.components = this.components.filter(c => c.id !== parseInt(id));
            localStorage.setItem('savedComponents', JSON.stringify(this.components));
            this.loadSavedComponents();
        }
    }

    clearBuilder() {
        if (confirm('Are you sure you want to clear the builder?')) {
            this.componentBuilder.innerHTML = '';
            this.updateBuilderPreview();
        }
    }

    addToBuilder() {
        if (this.preview.textContent.trim()) {
            this.componentBuilder.innerHTML += this.preview.innerHTML;
            this.updateBuilderPreview();
        }
    }

    updateBuilderPreview() {
        const builderIframe = document.getElementById('builder-preview-iframe');
        const iframeDoc = builderIframe.contentDocument || builderIframe.contentWindow.document;

        iframeDoc.open();
        iframeDoc.write(this.componentBuilder.innerHTML);
        iframeDoc.close();
    }

    handleTemplateChange() {
        const templateKey = this.templateSelect.value;
        if (!templateKey) {
            this.variableInputs.innerHTML = '';
            this.preview.textContent = '';
            return;
        }

        const selectedTemplate = templates[templateKey];
        this.createVariableInputs(selectedTemplate);
        this.updatePreview();
    }

    createVariableInputs(template) {
        this.variableInputs.innerHTML = '';
        
        Object.entries(template.variables).forEach(([key, variable]) => {
            const inputContainer = document.createElement('div');
            inputContainer.className = 'variable-input';
            
            const label = document.createElement('label');
            label.htmlFor = `var-${key}`;
            label.textContent = variable.label;
            
            const input = document.createElement('input');
            input.type = 'text';
            input.id = `var-${key}`;
            input.value = variable.default || '';
            input.addEventListener('input', () => this.updatePreview());
            
            inputContainer.appendChild(label);
            inputContainer.appendChild(input);
            this.variableInputs.appendChild(inputContainer);
        });

        // Show sidebar when template is selected
        this.sidebar.classList.add('open');
    }

    copyToClipboard() {
        const textToCopy = this.preview.textContent;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                this.copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    this.copyBtn.textContent = 'Copy Code';
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    }

    changePreviewDevice(device) {
        const previewDevice = document.querySelector('.preview-device');
        
        // Remove all device classes and add the selected one
        previewDevice.classList.remove('desktop', 'tablet', 'mobile');
        previewDevice.classList.add(device);
        
        // Update active button
        this.deviceButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.device === device);
        });
    }

    updatePreview() {
        const templateKey = this.templateSelect.value;
        if (!templateKey) return;
        
        const selectedTemplate = templates[templateKey];
        let code = selectedTemplate.template;
        
        // Replace variables in the template
        Object.keys(selectedTemplate.variables).forEach(key => {
            const input = document.getElementById(`var-${key}`);
            const value = input ? input.value : selectedTemplate.variables[key].default;
            
            // Use regex to replace all occurrences
            const regex = new RegExp(`{{${key}}}`, 'g');
            code = code.replace(regex, value);
        });
        
        // Update code preview with syntax highlighting
        this.preview.textContent = code;
        Prism.highlightElement(this.preview);
        
        // Update HTML preview if it's an HTML template
        this.updateHtmlPreview(code);
    }

    isHtmlTemplate(template) {
        return template.template.trim().startsWith('<!DOCTYPE html>') || 
               template.template.trim().startsWith('<html') ||
               template.category === 'ui-components' ||
               template.category === 'email';
    }

    updateHtmlPreview(code) {
        const iframeDoc = this.previewIframe.contentDocument || this.previewIframe.contentWindow.document;
        
        iframeDoc.open();
        iframeDoc.write(code);
        iframeDoc.close();
    }

    toggleSidebar() {
        this.sidebar.classList.toggle('open');
    }
    
    closeSidebar() {
        this.sidebar.classList.remove('open');
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new SnippetGenerator();
});
