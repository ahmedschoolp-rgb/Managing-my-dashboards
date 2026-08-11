import { useMemo, useState } from 'react'
import {
  Activity,
  ArrowLeft,
  BarChart3,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CirclePlus,
  Clock3,
  FileBarChart,
  LayoutDashboard,
  MoreHorizontal,
  Search,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  Users,
} from 'lucide-react'

const dashboards = [
  { title: 'أداء المندوبين', description: 'متابعة الإنتاجية والإنجاز اليومي', type: 'تشغيلي', updated: 'منذ 12 دقيقة', progress: 82, color: 'blue', icon: Users },
  { title: 'تقرير المفرغين', description: 'تحليل ساعات العمل وجودة التفريغ', type: 'تحليلي', updated: 'منذ ساعة', progress: 64, color: 'violet', icon: FileBarChart },
  { title: 'ملخص العمليات', description: 'نظرة سريعة على مؤشرات التشغيل', type: 'إداري', updated: 'أمس', progress: 91, color: 'teal', icon: Activity },
  { title: 'الجودة والامتثال', description: 'رصد الملاحظات ونسب الالتزام', type: 'رقابي', updated: 'منذ يومين', progress: 48, color: 'amber', icon: CheckCircle2 },
]

const activities = [
  { title: 'تم تحديث تقرير المندوبين', detail: 'بواسطة سارة أحمد', time: 'منذ 12 دقيقة', icon: FileBarChart },
  { title: 'تم اعتماد لوحة جديدة', detail: 'ملخص العمليات', time: 'منذ ساعة', icon: CheckCircle2 },
  { title: 'تمت إضافة عضو للفريق', detail: 'محمد علي إلى فريق التشغيل', time: 'أمس، 04:32 م', icon: Users },
]

function App() {
  const [active, setActive] = useState('نظرة عامة')
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('الكل')
  const [showCreate, setShowCreate] = useState(false)
  const [dark, setDark] = useState(true)

  const filteredDashboards = useMemo(() => dashboards.filter((dashboard) => {
    const matchesQuery = `${dashboard.title} ${dashboard.description}`.includes(query)
    const matchesFilter = filter === 'الكل' || dashboard.type === filter
    return matchesQuery && matchesFilter
  }), [filter, query])

  return (
    <div className={dark ? 'app-shell dark' : 'app-shell'} dir="rtl">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><LayoutDashboard size={21} /></div>
          <div><strong>لوحتي</strong><span>مساحة عملك الذكية</span></div>
        </div>
        <div className="workspace-switcher"><span className="workspace-dot" /> الإدارة الرئيسية <ChevronDown size={15} /></div>
        <nav className="nav-list" aria-label="التنقل الرئيسي">
          <p className="nav-label">مساحة العمل</p>
          {['نظرة عامة', 'لوحاتي', 'التقارير', 'الفريق'].map((item, index) => {
            const Icon = [LayoutDashboard, BarChart3, FileBarChart, Users][index]
            return <button key={item} className={active === item ? 'nav-item active' : 'nav-item'} onClick={() => setActive(item)}><Icon size={18} /><span>{item}</span>{item === 'لوحاتي' && <b>4</b>}</button>
          })}
          <p className="nav-label spaced">الإعدادات</p>
          <button className="nav-item" onClick={() => setActive('الإعدادات')}><Settings2 size={18} /><span>الإعدادات</span></button>
        </nav>
        <div className="sidebar-footer"><div className="support-card"><Sparkles size={18} /><div><strong>استكشف لوحتك</strong><span>أنشئ لوحة مخصصة لفريقك</span></div><ArrowLeft size={16} /></div><div className="profile"><div className="avatar">س</div><div><strong>سارة أحمد</strong><span>مديرة العمليات</span></div><MoreHorizontal size={18} /></div></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><div className="breadcrumb"><span>مساحة العمل</span><ArrowLeft size={14} /><strong>{active}</strong></div><div className="top-actions"><button className="icon-button" aria-label="الإشعارات"><Bell size={19} /><i /></button><button className="theme-toggle" onClick={() => setDark(!dark)}>{dark ? 'الوضع الفاتح' : 'الوضع الداكن'}</button><div className="mini-avatar">س</div></div></header>
        <section className="page-heading"><div><div className="eyebrow"><span className="status-dot" /> الثلاثاء، 11 أغسطس 2026</div><h1>صباح الخير، سارة</h1><p>هذه لمحة سريعة عن أداء فريقك اليوم.</p></div><button className="primary-button" onClick={() => setShowCreate(true)}><CirclePlus size={18} /> إنشاء لوحة جديدة</button></section>

        <section className="stats-grid" aria-label="الإحصائيات"><Stat icon={LayoutDashboard} label="إجمالي اللوحات" value="12" meta="+2 هذا الشهر" tone="blue" /><Stat icon={Activity} label="مؤشر الأداء" value="86.4%" meta="+5.2% من الأسبوع الماضي" tone="teal" /><Stat icon={Users} label="أعضاء الفريق" value="28" meta="3 دعوات معلّقة" tone="violet" /><Stat icon={Clock3} label="آخر مزامنة" value="منذ 8 د" meta="كل شيء محدّث" tone="amber" /> </section>

        <div className="section-header"><div><h2>لوحات العمل</h2><p>تابع أهم المساحات التي تعمل عليها</p></div><div className="view-actions"><button className="filter-button"><SlidersHorizontal size={16} /> ترتيب حسب <ChevronDown size={14} /></button><button className="text-button">عرض الكل <ArrowLeft size={15} /></button></div></div>
        <section className="toolbar"><div className="search-box"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث عن لوحة..." aria-label="البحث عن لوحة" /></div><div className="filter-tabs">{['الكل', 'تشغيلي', 'تحليلي', 'إداري'].map((item) => <button key={item} className={filter === item ? 'filter-tab selected' : 'filter-tab'} onClick={() => setFilter(item)}>{item}</button>)}</div></section>
        <section className="dashboard-grid">{filteredDashboards.map((dashboard) => <DashboardCard key={dashboard.title} {...dashboard} />)}<button className="new-card" onClick={() => setShowCreate(true)}><span><CirclePlus size={21} /></span><strong>أضف لوحة جديدة</strong><small>ابدأ من قالب جاهز أو من الصفر</small></button></section>

        <section className="bottom-grid"><div className="panel"><div className="panel-heading"><div><h2>النشاط الأخير</h2><p>آخر التحديثات في مساحة العمل</p></div><button className="icon-button"><MoreHorizontal size={18} /></button></div><div className="activity-list">{activities.map((item) => { const Icon = item.icon; return <div className="activity-item" key={item.title}><div className="activity-icon"><Icon size={17} /></div><div><strong>{item.title}</strong><span>{item.detail}</span></div><time>{item.time}</time></div> })}</div></div><div className="insight-panel"><div className="insight-icon"><Sparkles size={20} /></div><div><span className="eyebrow">رؤية ذكية</span><h2>أداء فريقك يتحسن</h2><p>ارتفع متوسط إنجاز المهام بنسبة 12% هذا الأسبوع. استمر على هذا الإيقاع.</p><button className="text-button">عرض التحليل <ArrowLeft size={15} /></button></div></div></section>
      </main>
      {showCreate && <div className="modal-backdrop" onClick={() => setShowCreate(false)}><div className="modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setShowCreate(false)}>×</button><div className="modal-icon"><CirclePlus size={22} /></div><h2>إنشاء لوحة جديدة</h2><p>اختر اسمًا واضحًا للوحة التي تريد إضافتها لمساحة عملك.</p><input className="modal-input" placeholder="اسم اللوحة" autoFocus /><div className="modal-actions"><button className="secondary-button" onClick={() => setShowCreate(false)}>إلغاء</button><button className="primary-button" onClick={() => setShowCreate(false)}>إنشاء اللوحة</button></div></div></div>}
    </div>
  )
}

function Stat({ icon: Icon, label, value, meta, tone }: { icon: typeof Activity; label: string; value: string; meta: string; tone: string }) { return <div className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={19} /></div><div><span>{label}</span><strong>{value}</strong><small>{meta}</small></div></div> }
function DashboardCard({ title, description, type, updated, progress, color, icon: Icon }: typeof dashboards[number]) { return <article className="dashboard-card"><div className="card-top"><div className={`dashboard-icon ${color}`}><Icon size={20} /></div><button className="icon-button"><MoreHorizontal size={18} /></button></div><div className="card-copy"><span className="card-type">{type}</span><h3>{title}</h3><p>{description}</p></div><div className="progress-row"><span>نسبة الإنجاز</span><strong>{progress}%</strong></div><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><div className="card-footer"><span><Clock3 size={14} /> {updated}</span><button className="open-button">فتح اللوحة <ArrowLeft size={14} /></button></div></article> }

export default App
