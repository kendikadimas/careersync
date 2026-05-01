import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Head, Link, createInertiaApp, router, useForm, usePage } from "@inertiajs/react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { AlertCircle, ArrowLeft, ArrowRight, Award, BarChart2, Bell, Briefcase, Building2, Calculator, Camera, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, CircleDashed, Code, Coffee, Cpu, Database, DollarSign, ExternalLink, Eye, FileSearch, FileText, Filter, Flame, FolderGit2, Globe, GraduationCap, Info, LayoutDashboard, LayoutTemplate, Lightbulb, Link as Link$1, Loader2, Lock, LogIn, LogOut, Mail, Map, MapPin, Megaphone, Menu, Monitor, Palette, PlayCircle, Plus, RefreshCw, Rocket, Save, Search, Send, Settings, Share2, Shield, ShieldCheck, Smartphone, Sparkles, Target, Trash2, TrendingUp, Trophy, Upload, User, UserPlus, Users, Utensils, X, Zap } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Bar, BarChart, CartesianGrid, LabelList, Legend, PolarAngleAxis, PolarGrid, Radar, RadarChart, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import axios from "axios";
import { createRoot } from "react-dom/client";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region resources/js/Components/ui/interactive-hover-button.tsx
function cn$1(...inputs) {
	return twMerge(clsx(inputs));
}
function InteractiveHoverButton({ text = "Button", loadingText = "Processing...", successText = "Complete!", className, ...props }) {
	const [status, setStatus] = useState("idle");
	const isIdle = status === "idle";
	const handleClick = (e) => {
		if (status !== "idle") return;
		setStatus("loading");
		setTimeout(() => {
			setStatus("success");
			setTimeout(() => {
				setStatus("idle");
			}, 1500);
		}, 1500);
		if (props.onClick) props.onClick(e);
	};
	return /* @__PURE__ */ jsx(motion.button, {
		className: cn$1("group relative flex items-center justify-center overflow-hidden font-bold transition-all", "bg-navy-600 rounded-xl border border-navy-700 p-2 px-6 min-w-40 text-white shadow-sm hover:shadow-md", status === "loading" && "px-2", className),
		onClick: handleClick,
		layout: true,
		transition: {
			type: "spring",
			stiffness: 400,
			damping: 30
		},
		...props,
		children: /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			initial: false,
			children: /* @__PURE__ */ jsxs(motion.div, {
				className: "flex items-center gap-2",
				initial: {
					opacity: 0,
					y: 10
				},
				animate: {
					opacity: 1,
					y: 0
				},
				exit: {
					opacity: 0,
					y: -10
				},
				children: [
					/* @__PURE__ */ jsx("div", { className: cn$1("bg-white h-2 w-2 rounded-full transition-all duration-500 group-hover:scale-[60]", !isIdle && "scale-[60]") }),
					/* @__PURE__ */ jsx("span", {
						className: cn$1("inline-block transition-all duration-500 group-hover:translate-x-20 group-hover:opacity-0", !isIdle && "translate-x-20 opacity-0"),
						children: text
					}),
					/* @__PURE__ */ jsx("div", {
						className: cn$1("text-navy-600 absolute top-0 left-0 z-10 flex h-full w-full -translate-x-16 items-center justify-center gap-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100", !isIdle && "translate-x-0 opacity-100"),
						children: status === "idle" ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", { children: text }), /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })] }) : status === "loading" ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", { className: "border-white/30 border-t-white h-5 w-5 animate-spin rounded-full border-2" }), /* @__PURE__ */ jsx("span", { children: loadingText })] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Check, { className: "h-5 w-5" }), /* @__PURE__ */ jsx("span", { children: successText })] })
					})
				]
			}, "idle")
		})
	});
}
//#endregion
//#region resources/js/Components/Navbar.tsx
function Navbar() {
	const [open, setOpen] = useState(false);
	return /* @__PURE__ */ jsx("nav", {
		className: "sticky top-0 z-50 bg-[#f6f6f6] border-b border-slate-200",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-6xl mx-auto px-2 sm:px-2 lg:px-2",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "h-20 flex items-center justify-between",
				children: [
					/* @__PURE__ */ jsxs(Link, {
						href: "/",
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ jsx("img", {
							src: "/logo1.svg",
							alt: "Logo",
							className: "w-9 h-9 object-contain"
						}), /* @__PURE__ */ jsx("span", {
							className: "text-xl font-bold text-primary tracking-tight font-[family-name:var(--font-heading)]",
							children: "Kembangin"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "hidden md:flex items-center gap-8 text-[14px] font-medium text-slate-600",
						children: [/* @__PURE__ */ jsx(Link, {
							href: "/how-it-works",
							className: "hover:text-primary transition-colors",
							children: "Cara Kerja"
						}), /* @__PURE__ */ jsx(Link, {
							href: "/about",
							className: "hover:text-primary transition-colors",
							children: "Tentang Kami"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "hidden md:flex items-center gap-4",
						children: [/* @__PURE__ */ jsx(Link, {
							href: "/login",
							className: "text-[14px] font-semibold text-slate-600 hover:text-primary transition-colors px-4 py-2",
							children: "Masuk"
						}), /* @__PURE__ */ jsx(InteractiveHoverButton, {
							text: "Mulai Gratis",
							loadingText: "",
							successText: "",
							className: "rounded-lg shadow-lg shadow-primary/20 text-[14px] px-6 py-2.5 min-w-0",
							onClick: () => {
								setTimeout(() => {
									router.visit("/register");
								}, 1e3);
							}
						})]
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: () => setOpen(!open),
						className: "md:hidden p-2 text-slate-600",
						"aria-label": "Menu",
						children: open ? /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Menu, { className: "w-5 h-5" })
					})
				]
			}), open && /* @__PURE__ */ jsxs("div", {
				className: "md:hidden pb-4 flex flex-col gap-2 text-sm",
				children: [
					/* @__PURE__ */ jsx(Link, {
						href: "/how-it-works",
						className: "py-4 text-slate-600 font-medium border-t border-slate-50",
						children: "Cara Kerja"
					}),
					/* @__PURE__ */ jsx(Link, {
						href: "/about",
						className: "py-4 text-slate-600 font-medium border-t border-slate-50",
						children: "Tentang Kami"
					}),
					/* @__PURE__ */ jsx(Link, {
						href: "/login",
						className: "py-4 text-slate-600 font-medium border-t border-slate-50",
						children: "Masuk"
					}),
					/* @__PURE__ */ jsx(InteractiveHoverButton, {
						text: "Mulai Gratis",
						loadingText: "",
						successText: "",
						className: "rounded-lg mt-2 min-w-0",
						onClick: () => {
							setTimeout(() => {
								router.visit("/register");
							}, 1e3);
						}
					})
				]
			})]
		})
	});
}
//#endregion
//#region resources/js/Pages/About.tsx
var About_exports = /* @__PURE__ */ __exportAll({ default: () => About });
function Footer$1() {
	return /* @__PURE__ */ jsxs("footer", {
		className: "bg-[#0A0A0B] text-slate-400 border-t border-slate-900 pt-24 pb-12 overflow-hidden relative",
		children: [
			/* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" }),
			/* @__PURE__ */ jsx("div", { className: "absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-primary/10 blur-[100px] rounded-full pointer-events-none" }),
			/* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto px-6 lg:px-8",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-20",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "lg:col-span-1",
							children: [
								/* @__PURE__ */ jsxs(Link, {
									href: "/",
									className: "flex items-center gap-3 mb-8",
									children: [/* @__PURE__ */ jsx("div", {
										className: "w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20",
										children: /* @__PURE__ */ jsx("img", {
											src: "/logo1.svg",
											alt: "Logo",
											className: "w-6 h-6 object-contain invert brightness-0"
										})
									}), /* @__PURE__ */ jsx("span", {
										className: "text-2xl font-bold text-white tracking-tight font-[family-name:var(--font-heading)]",
										children: "Kembangin"
									})]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-base leading-relaxed mb-8 max-w-sm text-slate-400 font-medium",
									children: "Solusi cerdas berbasis AI untuk mengakselerasi karier digital Anda dengan menjembatani kesenjangan antara pendidikan dan industri."
								}),
								/* @__PURE__ */ jsx("div", {
									className: "flex items-center gap-4",
									children: /* @__PURE__ */ jsx("p", {
										className: "text-sm font-bold text-slate-500 tracking-widest",
										children: "Follow Our Journey"
									})
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
							className: "text-white font-bold text-xl mb-8 font-[family-name:var(--font-heading)]",
							children: "Produk"
						}), /* @__PURE__ */ jsx("ul", {
							className: "space-y-4",
							children: [
								{
									name: "Diagnosis AI",
									href: "/#features"
								},
								{
									name: "Roadmap Adaptif",
									href: "/how-it-works"
								},
								{
									name: "Market Insights",
									href: "/market"
								}
							].map((link, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
								href: link.href,
								className: "text-base hover:text-white transition-colors duration-200 flex items-center group",
								children: [/* @__PURE__ */ jsx("div", { className: "w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100" }), link.name]
							}) }, i))
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
							className: "text-white font-bold text-xl mb-8 font-[family-name:var(--font-heading)]",
							children: "Sumber"
						}), /* @__PURE__ */ jsx("ul", {
							className: "space-y-4",
							children: [
								{
									name: "Blog Karier",
									href: "/blog"
								},
								{
									name: "Dokumentasi",
									href: "/docs"
								},
								{
									name: "FAQ",
									href: "/faq"
								}
							].map((link, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
								href: link.href,
								className: "text-base hover:text-white transition-colors duration-200 flex items-center group",
								children: [/* @__PURE__ */ jsx("div", { className: "w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100" }), link.name]
							}) }, i))
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
							className: "text-white font-bold text-xl mb-8 font-[family-name:var(--font-heading)]",
							children: "SDG Compliance"
						}), /* @__PURE__ */ jsxs("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 bg-slate-900/50 p-3 rounded-xl border border-slate-800",
								children: [/* @__PURE__ */ jsx("div", {
									className: "w-10 h-10 bg-emerald-500 rounded flex items-center justify-center font-black text-white text-lg shrink-0",
									children: "4"
								}), /* @__PURE__ */ jsxs("div", {
									className: "text-xs leading-tight",
									children: [/* @__PURE__ */ jsx("div", {
										className: "text-white font-bold mb-1 tracking-wide",
										children: "Quality Education"
									}), /* @__PURE__ */ jsx("p", { children: "Menjamin pendidikan inklusif & merata." })]
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 bg-slate-900/50 p-3 rounded-xl border border-slate-800",
								children: [/* @__PURE__ */ jsx("div", {
									className: "w-10 h-10 bg-amber-600 rounded flex items-center justify-center font-black text-white text-lg shrink-0",
									children: "8"
								}), /* @__PURE__ */ jsxs("div", {
									className: "text-xs leading-tight",
									children: [/* @__PURE__ */ jsx("div", {
										className: "text-white font-bold mb-1 tracking-wide",
										children: "Decent Work"
									}), /* @__PURE__ */ jsx("p", { children: "Pertumbuhan ekonomi & pekerjaan layak." })]
								})]
							})]
						})] })
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "text-sm font-medium",
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" Kembangin. Seluruh hak cipta dilindungi."
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 px-4 py-1.5 bg-slate-900 rounded-full border border-slate-800 text-xs font-bold text-slate-500",
						children: [/* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }), "SDG 4 & SDG 8 Compliant"]
					})]
				})]
			})
		]
	});
}
function About() {
	const [activeValue, setActiveValue] = useState(0);
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-white text-slate-900 selection:bg-primary selection:text-white",
		children: [
			/* @__PURE__ */ jsx(Head, { title: "Tentang Kami — Kembangin" }),
			/* @__PURE__ */ jsx(Navbar, {}),
			/* @__PURE__ */ jsxs("section", {
				className: "relative pt-20 pb-12 bg-[#f6f6f6]",
				children: [
					/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-40" }),
					/* @__PURE__ */ jsxs("div", {
						className: "max-w-7xl mx-auto px-6 relative z-10 text-left",
						children: [
							/* @__PURE__ */ jsx(motion.div, {
								initial: {
									opacity: 0,
									y: 10
								},
								animate: {
									opacity: 1,
									y: 0
								},
								className: "text-primary font-bold tracking-wider text-xs mb-4",
								children: "About Us"
							}),
							/* @__PURE__ */ jsxs(motion.h1, {
								initial: {
									opacity: 0,
									y: 20
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: { delay: .1 },
								className: "text-5xl md:text-[64px] font-black text-slate-950 leading-tight mb-6 tracking-tight font-[family-name:var(--font-heading)]",
								children: [
									"Kami Hadir untuk Mengakselerasi ",
									/* @__PURE__ */ jsx("br", {}),
									" Masa Depan Digital Anda."
								]
							}),
							/* @__PURE__ */ jsx(motion.p, {
								initial: {
									opacity: 0,
									y: 10
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: { delay: .2 },
								className: "text-lg text-slate-500 font-medium max-w-2xl leading-relaxed",
								children: "Kembang.in adalah platform AI-Powered yang menjembatani kesenjangan antara kurikulum akademis dan standar industri teknologi terkini."
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "max-w-7xl mx-auto px-6 mt-12",
						children: /* @__PURE__ */ jsxs("div", {
							className: "bg-white rounded-[48px] p-10 md:p-16 border border-slate-100 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative overflow-hidden shadow-sm",
							children: [
								/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" }),
								/* @__PURE__ */ jsx(motion.div, {
									initial: {
										opacity: 0,
										x: -30
									},
									whileInView: {
										opacity: 1,
										x: 0
									},
									viewport: { once: true },
									className: "w-full lg:w-1/3 flex justify-start",
									children: /* @__PURE__ */ jsxs("div", {
										className: "relative group",
										children: [/* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" }), /* @__PURE__ */ jsx("img", {
											src: "/logo1.svg",
											alt: "Logo Kembangin",
											className: "w-64 h-64 object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
										})]
									})
								}),
								/* @__PURE__ */ jsx("div", {
									className: "w-full lg:w-2/3",
									children: /* @__PURE__ */ jsxs(motion.div, {
										initial: {
											opacity: 0,
											x: 30
										},
										whileInView: {
											opacity: 1,
											x: 0
										},
										viewport: { once: true },
										children: [/* @__PURE__ */ jsxs("h2", {
											className: "text-3xl md:text-4xl font-black text-slate-950 mb-8 tracking-tight leading-tight",
											children: [
												"Simbol Inovasi dan ",
												/* @__PURE__ */ jsx("br", {}),
												" Pertumbuhan Karir."
											]
										}), /* @__PURE__ */ jsxs("div", {
											className: "space-y-6 text-lg text-slate-600 font-medium leading-relaxed",
											children: [
												/* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx("span", {
													className: "text-primary font-bold",
													children: "Kembangin"
												}), " bukan sekadar platform, melainkan filosofi pertumbuhan. Nama \"Kembangin\" diambil dari kata \"Kembangkan\", mencerminkan misi kami untuk terus menumbuhkan potensi setiap talenta digital di Indonesia melalui teknologi kecerdasan buatan."] }),
												/* @__PURE__ */ jsx("p", { children: "Visual kami yang bersih dan dinamis merepresentasikan transparansi, presisi data, dan kesiapan untuk beradaptasi dengan perubahan industri yang sangat cepat. Kami percaya bahwa setiap individu memiliki benih kompetensi yang hanya membutuhkan ekosistem yang tepat untuk mekar dan menjadi profesional yang tangguh." }),
												/* @__PURE__ */ jsxs("div", {
													className: "pt-4 flex items-center gap-4",
													children: [/* @__PURE__ */ jsx("div", { className: "w-12 h-1 bg-primary rounded-full" }), /* @__PURE__ */ jsx("span", {
														className: "text-slate-900 font-bold tracking-widest text-sm",
														children: "Empowering Digital Talents"
													})]
												})
											]
										})]
									})
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ jsx("section", {
				className: "py-16 bg-white border-b border-slate-100",
				children: /* @__PURE__ */ jsx("div", {
					className: "max-w-7xl mx-auto px-6",
					children: /* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-1 lg:grid-cols-2 gap-24",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "space-y-16",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("h2", {
								className: "text-3xl font-black text-slate-950 mb-6 tracking-tight flex items-center gap-3",
								children: [/* @__PURE__ */ jsx(Target, { className: "w-8 h-8 text-primary" }), " Misi Kami"]
							}), /* @__PURE__ */ jsx("p", {
								className: "text-lg text-slate-600 leading-relaxed font-medium",
								children: "Memberdayakan talenta digital Indonesia dengan identifikasi skill-gap berbasis data, menyediakan alur belajar yang adaptif, dan memastikan setiap lulusan siap berkontribusi langsung di industri."
							})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("h2", {
								className: "text-3xl font-black text-slate-950 mb-6 tracking-tight flex items-center gap-3",
								children: [/* @__PURE__ */ jsx(Lightbulb, { className: "w-8 h-8 text-amber-500" }), " Visi Kami"]
							}), /* @__PURE__ */ jsx("p", {
								className: "text-lg text-slate-600 leading-relaxed font-medium",
								children: "Menjadi standar global dalam sinkronisasi talenta dan industri, menciptakan masa depan di mana tidak ada lagi lulusan yang terhambat oleh ketidakrelevanan kurikulum."
							})] })]
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
							className: "text-3xl font-black text-slate-950 mb-10 tracking-tight",
							children: "Nilai-Nilai Kami"
						}), /* @__PURE__ */ jsx("div", {
							className: "space-y-4",
							children: [
								{
									title: "Industry-First Approach",
									desc: "Setiap kurikulum yang kami sajikan divalidasi langsung oleh kebutuhan riil industri saat ini. Kami memastikan tidak ada materi yang usang."
								},
								{
									title: "Data-Driven Decisions",
									desc: "Kami menggunakan AI untuk memetakan skill-gap secara presisi berdasarkan ribuan data lowongan kerja dari berbagai platform global."
								},
								{
									title: "Lifelong Learning Culture",
									desc: "Kami percaya bahwa belajar adalah proses berkelanjutan, bukan sekadar tujuan akhir. Sistem kami beradaptasi dengan kecepatan Anda."
								},
								{
									title: "Transparent Impact",
									desc: "Kami mengukur kesiapan kerja Anda melalui angka yang jujur dan dapat diverifikasi, memberikan laporan nyata untuk profil profesional Anda."
								},
								{
									title: "Collaborative Ecosystem",
									desc: "Membangun jembatan yang kokoh antara institusi pendidikan, talenta, dan perusahaan untuk ekosistem kerja yang lebih baik."
								}
							].map((v, i) => /* @__PURE__ */ jsxs("div", {
								className: `border-b border-slate-100 transition-all duration-300 ${activeValue === i ? "pb-6" : "pb-4"}`,
								children: [/* @__PURE__ */ jsxs("button", {
									onClick: () => setActiveValue(activeValue === i ? null : i),
									className: "w-full flex items-center justify-between group text-left",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-6",
										children: [/* @__PURE__ */ jsx("div", { className: `w-3 h-3 rounded-full transition-all duration-300 ${activeValue === i ? "bg-primary scale-125" : "bg-slate-200 group-hover:bg-primary/50"}` }), /* @__PURE__ */ jsx("h3", {
											className: `text-xl font-bold transition-colors duration-300 ${activeValue === i ? "text-slate-950" : "text-slate-500 group-hover:text-slate-800"}`,
											children: v.title
										})]
									}), /* @__PURE__ */ jsx(ChevronDown, { className: `w-5 h-5 text-slate-400 transition-transform duration-300 ${activeValue === i ? "rotate-180 text-primary" : ""}` })]
								}), /* @__PURE__ */ jsx(AnimatePresence, { children: activeValue === i && /* @__PURE__ */ jsx(motion.div, {
									initial: {
										height: 0,
										opacity: 0
									},
									animate: {
										height: "auto",
										opacity: 1
									},
									exit: {
										height: 0,
										opacity: 0
									},
									transition: {
										duration: .3,
										ease: "easeInOut"
									},
									className: "overflow-hidden",
									children: /* @__PURE__ */ jsx("p", {
										className: "pl-9 pt-4 text-slate-500 leading-relaxed font-medium",
										children: v.desc
									})
								}) })]
							}, i))
						})] })]
					})
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "py-16 bg-white",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-7xl px-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "text-left mb-6",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "text-4xl font-black text-slate-950 mb-4 tracking-tight",
							children: "Para Inovator Kami"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-slate-500 font-medium max-w-2xl",
							children: "Tim kami berdedikasi tinggi untuk menghadirkan solusi terbaik bagi masa depan karier Anda."
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-0",
						children: /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-2 gap-8 py-4 md:grid-cols-3 lg:grid-cols-4",
							children: [[
								{
									name: "Dimas Kendika Fazrulfalah",
									role: "Founder & AI Engineer",
									univ: "Universitas Jenderal Soedirman",
									avatar: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200&h=200&auto=format&fit=crop"
								},
								{
									name: "Sellyjuan Alya Rosalina",
									role: "UI/UX Designer & Frontend",
									univ: "Universitas Jenderal Soedirman",
									avatar: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=200&h=200&auto=format&fit=crop"
								},
								{
									name: "Akmal Adhi Nugroho",
									role: "Business Analyst & Research",
									univ: "Universitas Jenderal Soedirman",
									avatar: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=200&h=200&auto=format&fit=crop"
								}
							].map((member, index) => /* @__PURE__ */ jsxs("div", {
								className: "group",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "bg-background size-24 rounded-full border p-1 shadow-sm transition-transform duration-500 group-hover:scale-110 border-slate-100",
										children: /* @__PURE__ */ jsx("img", {
											className: "aspect-square rounded-full object-cover",
											src: member.avatar,
											alt: member.name,
											height: "200",
											width: "200",
											loading: "lazy"
										})
									}),
									/* @__PURE__ */ jsx("span", {
										className: "mt-6 block text-lg font-bold text-slate-950 tracking-tight leading-tight",
										children: member.name
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-primary block text-sm font-bold mt-1",
										children: member.role
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-slate-400 block text-xs font-bold mt-0.5",
										children: member.univ
									})
								]
							}, index)), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col items-start lg:items-end lg:text-right lg:col-start-4",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "bg-white size-24 rounded-2xl border p-4 shadow-sm border-slate-100 flex items-center justify-center mb-6",
										children: /* @__PURE__ */ jsx("img", {
											src: "/Logo-UNSOED.png",
											alt: "Logo Unsoed",
											className: "w-full h-full object-contain"
										})
									}),
									/* @__PURE__ */ jsx("span", {
										className: "block text-lg font-black text-slate-950 tracking-tight leading-tight",
										children: "Universitas Jenderal Soedirman"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-slate-400 block text-xs font-bold mt-1 text-right",
										children: "Purwokerto, Jawa Tengah"
									})
								]
							})]
						})
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "py-16 bg-white",
				children: /* @__PURE__ */ jsx("div", {
					className: "max-w-7xl mx-auto px-6",
					children: /* @__PURE__ */ jsxs("div", {
						className: "bg-gradient-to-br from-slate-900 to-slate-950 rounded-[48px] p-10 md:p-16 relative overflow-hidden shadow-2xl",
						children: [
							/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" }),
							/* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" }),
							/* @__PURE__ */ jsxs("div", {
								className: "relative z-10 max-w-2xl text-left",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold mb-6",
										children: "Mulai Perjalanan Karier"
									}),
									/* @__PURE__ */ jsxs("h2", {
										className: "text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight",
										children: [
											"Kembangkan Skill Digital ",
											/* @__PURE__ */ jsx("br", {}),
											" Anda ke Level Selanjutnya."
										]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-lg text-blue-50 font-medium leading-relaxed mb-8",
										children: "Bergabunglah dengan ribuan talenta digital lainnya yang telah berhasil mengakselerasi karier mereka melalui diagnosis AI dan roadmap belajar yang personal."
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-wrap gap-4",
										children: [/* @__PURE__ */ jsx(Link, {
											href: "/register",
											className: "bg-white text-primary px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all shadow-lg shadow-black/10",
											children: "Daftar Sekarang"
										}), /* @__PURE__ */ jsx(Link, {
											href: "/how-it-works",
											className: "bg-white/10 border border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold transition-all backdrop-blur-sm",
											children: "Lihat Cara Kerja"
										})]
									})
								]
							})
						]
					})
				})
			}),
			/* @__PURE__ */ jsx(Footer$1, {})
		]
	});
}
//#endregion
//#region resources/js/Layouts/AppLayout.tsx
function AppLayout({ children, header }) {
	const { auth, flash, notifications } = usePage().props;
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [showBadgeToast, setShowBadgeToast] = useState(false);
	const [activeBadges, setActiveBadges] = useState([]);
	const [openPanel, setOpenPanel] = useState(null);
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
	useEffect(() => {
		if (flash.new_badges && flash.new_badges.length > 0) {
			setActiveBadges(flash.new_badges);
			setShowBadgeToast(true);
			const timer = setTimeout(() => setShowBadgeToast(false), 8e3);
			return () => clearTimeout(timer);
		}
	}, [flash.new_badges]);
	const menuGroups = [
		{
			title: "Menu Utama",
			items: [{
				name: "Dashboard",
				href: route("dashboard"),
				icon: LayoutDashboard,
				active: route().current("dashboard")
			}]
		},
		{
			title: "Analisis & Progress",
			items: [
				{
					name: "Diagnostic Assessment",
					href: route("analysis"),
					icon: FileSearch,
					active: route().current("analysis")
				},
				{
					name: "Learning Path & PBL",
					href: route("roadmap"),
					icon: Map,
					active: route().current("roadmap")
				},
				{
					name: "Market Intelligence",
					href: route("market"),
					icon: TrendingUp,
					active: route().current("market")
				}
			]
		},
		{
			title: "Personal & Portofolio",
			items: [{
				name: "Leaderboard",
				href: route("leaderboard"),
				icon: Trophy,
				active: route().current("leaderboard")
			}, {
				name: "My Portfolio",
				href: route("portfolio.index"),
				icon: Briefcase,
				active: route().current("portfolio.index")
			}]
		}
	];
	const navItems = menuGroups.flatMap((g) => g.items);
	const activeItem = navItems.find((item) => item.active);
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-[#F3F6FF] flex text-[#1A1A2E] dashboard-font max-w-full items-start",
		children: [
			/* @__PURE__ */ jsxs("aside", {
				className: `hidden md:flex flex-col ${isSidebarCollapsed ? "w-20" : "w-64"} bg-indigo-950 sticky top-0 h-screen z-20 border-r border-white/5 transition-all duration-200 shadow-2xl`,
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "p-6 flex items-center gap-3",
						children: [
							/* @__PURE__ */ jsx("img", {
								src: "/logo-white.svg",
								alt: "Logo",
								className: "w-10 h-10 object-contain"
							}),
							!isSidebarCollapsed && /* @__PURE__ */ jsx("span", {
								className: "font-bold text-lg text-white tracking-tight",
								children: "Kembangin"
							}),
							/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setIsSidebarCollapsed(!isSidebarCollapsed),
								className: "ml-auto w-8 h-8 rounded-full bg-white/10 border border-white/10 text-white/50 hover:text-white hover:border-white/30 flex items-center justify-center transition-all",
								"aria-label": "Toggle sidebar",
								children: isSidebarCollapsed ? "›" : "‹"
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: `px-4 mt-6 flex-1 flex flex-col ${isSidebarCollapsed ? "px-2" : ""} overflow-y-auto custom-scrollbar`,
						children: menuGroups.map((group, idx) => /* @__PURE__ */ jsxs("div", {
							className: idx !== 0 ? "mt-8" : "",
							children: [!isSidebarCollapsed && /* @__PURE__ */ jsx("p", {
								className: "text-[10px] font-extrabold text-white tracking-widest px-4 mb-3",
								children: group.title
							}), /* @__PURE__ */ jsx("nav", {
								className: "space-y-1",
								children: group.items.map((item) => /* @__PURE__ */ jsxs(Link, {
									href: item.href,
									className: `w-full h-10 ${isSidebarCollapsed ? "px-0 justify-center" : "px-4 justify-between"} rounded-lg text-[12px] font-black inline-flex items-center transition-all ${item.active ? "bg-white text-indigo-950 shadow-lg shadow-indigo-950/20" : "text-indigo-100/60 font-bold hover:bg-white/10 hover:text-white"}`,
									children: [/* @__PURE__ */ jsxs("span", {
										className: `inline-flex items-center ${isSidebarCollapsed ? "" : "gap-3"}`,
										children: [/* @__PURE__ */ jsx(item.icon, { className: `w-4 h-4 ${item.active ? "text-indigo-600" : "text-indigo-300/50"}` }), !isSidebarCollapsed && /* @__PURE__ */ jsx("span", { children: item.name })]
									}), !isSidebarCollapsed && item.active && /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-indigo-600 shadow-sm" })]
								}, item.name))
							})]
						}, group.title))
					}),
					/* @__PURE__ */ jsx("div", {
						className: `p-4 mt-auto border-t border-white/5 ${isSidebarCollapsed ? "px-2" : ""}`,
						children: /* @__PURE__ */ jsxs(Link, {
							href: route("logout"),
							method: "post",
							as: "button",
							className: `w-full h-11 ${isSidebarCollapsed ? "px-0 justify-center" : "px-4 justify-start"} rounded-lg text-[13px] font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 inline-flex items-center ${isSidebarCollapsed ? "" : "gap-3"} transition-all`,
							children: [/* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4" }), !isSidebarCollapsed && "Sign Out"]
						})
					})
				]
			}),
			/* @__PURE__ */ jsxs("main", {
				className: `flex-1 flex flex-col transition-all duration-200 min-w-0 max-w-full overflow-x-hidden`,
				children: [/* @__PURE__ */ jsxs("header", {
					className: "sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-slate-200 h-16 flex items-center justify-between px-4 md:px-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsx("button", {
							className: "md:hidden p-2 text-[#2D3A8C]",
							onClick: () => setIsMobileMenuOpen(true),
							children: /* @__PURE__ */ jsx(Menu, { className: "w-6 h-6" })
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 text-[12px] font-semibold text-slate-500",
							children: [
								/* @__PURE__ */ jsx(Link, {
									href: route("dashboard"),
									className: "hover:text-[#1A1A2E]",
									children: "Dashboard"
								}),
								/* @__PURE__ */ jsx("span", {
									className: "text-slate-300",
									children: "/"
								}),
								activeItem && activeItem.name !== "Dashboard" ? /* @__PURE__ */ jsx(Link, {
									href: activeItem.href,
									className: "text-[#1A1A2E] hover:underline",
									children: header || activeItem.name
								}) : /* @__PURE__ */ jsx("span", {
									className: "text-[#1A1A2E]",
									children: header || "Dashboard"
								})
							]
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3 relative",
						children: [
							/* @__PURE__ */ jsx("button", {
								className: "w-9 h-9 rounded-full bg-indigo-900 flex items-center justify-center text-white hover:bg-indigo-800 transition-colors",
								onClick: () => setOpenPanel(openPanel === "settings" ? null : "settings"),
								"aria-label": "Settings",
								type: "button",
								children: /* @__PURE__ */ jsx(Settings, { className: "w-4 h-4" })
							}),
							/* @__PURE__ */ jsx("button", {
								className: "w-9 h-9 rounded-full bg-indigo-900 flex items-center justify-center text-white hover:bg-indigo-800 transition-colors",
								onClick: () => setOpenPanel(openPanel === "notifications" ? null : "notifications"),
								"aria-label": "Notifications",
								type: "button",
								children: /* @__PURE__ */ jsx(Bell, { className: "w-4 h-4" })
							}),
							/* @__PURE__ */ jsxs("button", {
								className: "flex items-center gap-2",
								onClick: () => setOpenPanel(openPanel === "profile" ? null : "profile"),
								type: "button",
								children: [/* @__PURE__ */ jsx("div", {
									className: "w-9 h-9 rounded-full bg-linear-to-br from-orange-300 to-pink-400 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center text-white font-bold text-xs",
									children: auth?.user?.name?.charAt(0) || "U"
								}), /* @__PURE__ */ jsxs("div", {
									className: "leading-tight hidden sm:block text-left",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-[12px] font-bold text-[#1A1A2E]",
										children: auth?.user?.name || "User"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-[10px] text-slate-400",
										children: auth?.user?.email || "user@email.com"
									})]
								})]
							}),
							openPanel === "settings" && /* @__PURE__ */ jsxs("div", {
								className: "absolute right-40 top-12 w-64 bg-white border border-slate-200 shadow-lg rounded-lg p-4 z-20",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-sm font-bold text-[#1A1A2E] mb-3",
									children: "Settings"
								}), /* @__PURE__ */ jsxs("div", {
									className: "space-y-2 text-sm text-slate-600",
									children: [
										/* @__PURE__ */ jsx(Link, {
											href: route("settings.index"),
											className: "block px-3 py-2 rounded-lg hover:bg-slate-50",
											children: "Akun & Privasi"
										}),
										/* @__PURE__ */ jsx(Link, {
											href: route("settings.index"),
											className: "block px-3 py-2 rounded-lg hover:bg-slate-50",
											children: "Preferensi Notifikasi"
										}),
										/* @__PURE__ */ jsx(Link, {
											href: route("settings.index"),
											className: "block px-3 py-2 rounded-lg hover:bg-slate-50",
											children: "Bahasa & Tampilan"
										})
									]
								})]
							}),
							openPanel === "notifications" && /* @__PURE__ */ jsxs("div", {
								className: "absolute right-24 top-12 w-72 bg-white border border-slate-200 shadow-lg rounded-lg p-4 z-20",
								children: [
									/* @__PURE__ */ jsx("p", {
										className: "text-sm font-bold text-[#1A1A2E] mb-3",
										children: "Notifications"
									}),
									/* @__PURE__ */ jsx("div", {
										className: "space-y-3",
										children: notifications && notifications.length > 0 ? notifications.map((item) => /* @__PURE__ */ jsxs("div", {
											className: "p-3 rounded-lg bg-slate-50",
											children: [
												/* @__PURE__ */ jsx("p", {
													className: "text-[12px] font-semibold text-[#1A1A2E]",
													children: item.title
												}),
												/* @__PURE__ */ jsx("p", {
													className: "text-[11px] text-slate-500",
													children: item.body || "Tidak ada detail"
												}),
												/* @__PURE__ */ jsxs("div", {
													className: "flex items-center justify-between mt-2",
													children: [/* @__PURE__ */ jsx("span", {
														className: "text-[10px] text-slate-400",
														children: item.read_at ? "Sudah dibaca" : "Belum dibaca"
													}), !item.read_at && /* @__PURE__ */ jsx(Link, {
														href: route("notifications.read", item.id),
														method: "patch",
														as: "button",
														className: "text-[10px] font-semibold text-[#2563EB]",
														children: "Tandai"
													})]
												})
											]
										}, item.id)) : /* @__PURE__ */ jsx("p", {
											className: "text-[12px] text-slate-500",
											children: "Belum ada notifikasi."
										})
									}),
									/* @__PURE__ */ jsx("div", {
										className: "pt-3",
										children: /* @__PURE__ */ jsx(Link, {
											href: route("notifications.index"),
											className: "text-[12px] font-semibold text-[#2563EB]",
											children: "Lihat semua"
										})
									})
								]
							}),
							openPanel === "profile" && /* @__PURE__ */ jsxs("div", {
								className: "absolute right-0 top-12 w-64 bg-white border border-slate-200 shadow-lg rounded-lg p-4 z-20",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3 mb-3",
									children: [/* @__PURE__ */ jsx("div", {
										className: "w-10 h-10 rounded-full bg-linear-to-br from-orange-300 to-pink-400 flex items-center justify-center text-white font-bold",
										children: auth?.user?.name?.charAt(0) || "U"
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "text-sm font-bold text-[#1A1A2E]",
										children: auth?.user?.name || "User"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-[11px] text-slate-500",
										children: auth?.user?.email || "user@email.com"
									})] })]
								}), /* @__PURE__ */ jsxs("div", {
									className: "space-y-2 text-sm text-slate-600",
									children: [
										/* @__PURE__ */ jsx(Link, {
											href: route("profile.details"),
											className: "block px-3 py-2 rounded-lg hover:bg-slate-50",
											children: "Detail Profil"
										}),
										/* @__PURE__ */ jsx(Link, {
											href: route("profile.edit"),
											className: "block px-3 py-2 rounded-lg hover:bg-slate-50",
											children: "Keamanan Akun"
										}),
										/* @__PURE__ */ jsx(Link, {
											href: route("profile.edit"),
											className: "block px-3 py-2 rounded-lg hover:bg-slate-50",
											children: "Pengaturan Karier"
										})
									]
								})]
							})
						]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "p-3 md:p-6 w-full relative",
					children: [
						showBadgeToast && /* @__PURE__ */ jsx("div", {
							className: "fixed bottom-8 right-8 z-100 flex flex-col gap-3 max-w-sm animate-in slide-in-from-right duration-500",
							children: activeBadges.map((badge, idx) => /* @__PURE__ */ jsxs("div", {
								className: "bg-[#2D3A8C] border-2 border-[#4F6FE8] shadow-2xl shadow-[#4F6FE8]/20 p-5 rounded-lg text-white flex gap-4",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "text-4xl animate-bounce",
										children: badge.emoji
									}),
									/* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsx("h4", {
											className: "font-black text-[#A9C7FF] uppercase tracking-widest text-xs mb-1",
											children: "New Badge Earned!"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "font-bold text-lg leading-tight",
											children: badge.name
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm text-white/70 mt-1",
											children: badge.description
										})
									] }),
									/* @__PURE__ */ jsx("button", {
										onClick: () => setShowBadgeToast(false),
										className: "absolute top-3 right-3 text-white/40 hover:text-white",
										children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
									})
								]
							}, idx))
						}),
						flash.success && /* @__PURE__ */ jsxs("div", {
							className: "mb-6 p-4 bg-[#EAF0FF] border border-[#D9E4FF] text-[#2D3A8C] rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top duration-300",
							children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 text-indigo-900" }), /* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium",
								children: flash.success
							})]
						}),
						flash.error && /* @__PURE__ */ jsxs("div", {
							className: "mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-3",
							children: [/* @__PURE__ */ jsx(X, { className: "w-5 h-5 text-red-500" }), /* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium",
								children: flash.error
							})]
						}),
						children
					]
				})]
			}),
			isMobileMenuOpen && /* @__PURE__ */ jsxs("div", {
				className: "fixed inset-0 z-50 md:hidden",
				children: [/* @__PURE__ */ jsx("div", {
					className: "absolute inset-0 bg-black/50 backdrop-blur-sm",
					onClick: () => setIsMobileMenuOpen(false)
				}), /* @__PURE__ */ jsxs("aside", {
					className: "absolute left-0 top-0 bottom-0 w-80 bg-indigo-950 text-white flex flex-col p-5 animate-in slide-in-from-left duration-300",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between mb-8",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ jsx("div", {
									className: "w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20",
									children: "K"
								}), /* @__PURE__ */ jsx("span", {
									className: "font-bold text-lg tracking-tight",
									children: "Kembangin"
								})]
							}), /* @__PURE__ */ jsx("button", {
								onClick: () => setIsMobileMenuOpen(false),
								className: "p-2 text-white/50 hover:text-white",
								children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6" })
							})]
						}),
						/* @__PURE__ */ jsx("nav", {
							className: "flex-1 space-y-1",
							children: navItems.map((item) => /* @__PURE__ */ jsxs(Link, {
								href: item.href,
								className: `w-full h-11 px-4 rounded-lg text-[13px] font-bold inline-flex items-center justify-between transition-all ${item.active ? "bg-white/10 text-white border-l-2 border-indigo-400" : "text-indigo-200/50 hover:bg-white/5 hover:text-white"}`,
								onClick: () => setIsMobileMenuOpen(false),
								children: [/* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-3",
									children: [/* @__PURE__ */ jsx(item.icon, { className: `w-4 h-4 ${item.active ? "text-indigo-400" : ""}` }), item.name]
								}), item.active && /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-sm shadow-indigo-400/50" })]
							}, item.name))
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-auto pt-6 border-t border-white/5",
							children: /* @__PURE__ */ jsxs(Link, {
								href: route("logout"),
								method: "post",
								as: "button",
								className: "w-full h-11 px-4 rounded-lg text-[13px] font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 inline-flex items-center gap-3 transition-all",
								children: [/* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4" }), "Sign Out"]
							})
						})
					]
				})]
			})
		]
	});
}
//#endregion
//#region resources/js/Pages/Analysis.tsx
var Analysis_exports = /* @__PURE__ */ __exportAll({ default: () => SkillGapAnalysis });
var DEFAULT_CAREER_TARGETS = [
	"Fullstack Developer",
	"Frontend Developer",
	"Backend Developer",
	"Mobile Developer",
	"DevOps Engineer",
	"Data Engineer"
];
function RadarChart$1({ data }) {
	const [hoveredPoint, setHoveredPoint] = useState(null);
	const cx = 200;
	const cy = 180;
	const r = 90;
	const n = data.length || 3;
	const hasData = data.length > 0;
	function point(val, idx) {
		const angle = Math.PI * 2 * idx / n - Math.PI / 2;
		return {
			x: cx + val * r * Math.cos(angle),
			y: cy + val * r * Math.sin(angle),
			angle
		};
	}
	function labelPoint(idx) {
		const angle = Math.PI * 2 * idx / n - Math.PI / 2;
		const dist = r + 35;
		return {
			x: cx + dist * Math.cos(angle),
			y: cy + dist * Math.sin(angle),
			angle
		};
	}
	function polyPath(vals) {
		return vals.map((v, i) => {
			const p = point(v, i);
			return `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`;
		}).join(" ") + " Z";
	}
	return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 400 360",
		className: "w-full max-w-[420px] mx-auto overflow-visible",
		children: [
			[
				.25,
				.5,
				.75,
				1
			].map((lvl) => /* @__PURE__ */ jsx("polygon", {
				points: Array.from({ length: n }, (_, i) => {
					const p = point(lvl, i);
					return `${p.x},${p.y}`;
				}).join(" "),
				fill: "none",
				stroke: "#e2e8f0",
				strokeWidth: "1"
			}, lvl)),
			data.map((_, i) => {
				const p = point(1, i);
				return /* @__PURE__ */ jsx("line", {
					x1: cx,
					y1: cy,
					x2: p.x,
					y2: p.y,
					stroke: "#e2e8f0",
					strokeWidth: "1"
				}, i);
			}),
			hasData && /* @__PURE__ */ jsx("path", {
				d: polyPath(data.map((d) => d.industryVal)),
				fill: "rgba(34,197,94,0.15)",
				stroke: "#22c55e",
				strokeWidth: "2",
				className: "transition-all duration-500"
			}),
			hasData && /* @__PURE__ */ jsx("path", {
				d: polyPath(data.map((d) => d.userVal)),
				fill: "rgba(37,99,235,0.2)",
				stroke: "#2563EB",
				strokeWidth: "2",
				className: "transition-all duration-500"
			}),
			hasData && data.map((d, i) => {
				const up = point(d.userVal, i);
				const ip = point(d.industryVal, i);
				const isUserHovered = hoveredPoint?.idx === i && hoveredPoint?.type === "user";
				const isIndustryHovered = hoveredPoint?.idx === i && hoveredPoint?.type === "industry";
				const uOffset = Math.sin(up.angle) < -.2 ? 18 : -14;
				const iOffset = Math.sin(ip.angle) < -.2 ? 18 : -14;
				return /* @__PURE__ */ jsxs("g", { children: [
					/* @__PURE__ */ jsx("circle", {
						cx: up.x,
						cy: up.y,
						r: isUserHovered ? 6 : 4,
						fill: "#2563EB",
						stroke: "white",
						strokeWidth: "2",
						onMouseEnter: () => setHoveredPoint({
							idx: i,
							type: "user"
						}),
						onMouseLeave: () => setHoveredPoint(null),
						className: "transition-all duration-200 cursor-pointer"
					}),
					/* @__PURE__ */ jsx("circle", {
						cx: ip.x,
						cy: ip.y,
						r: isIndustryHovered ? 6 : 4,
						fill: "#22c55e",
						stroke: "white",
						strokeWidth: "2",
						onMouseEnter: () => setHoveredPoint({
							idx: i,
							type: "industry"
						}),
						onMouseLeave: () => setHoveredPoint(null),
						className: "transition-all duration-200 cursor-pointer"
					}),
					isUserHovered && /* @__PURE__ */ jsxs("g", {
						transform: `translate(${up.x}, ${up.y + uOffset})`,
						children: [/* @__PURE__ */ jsx("rect", {
							x: "-18",
							y: "-7",
							width: "36",
							height: "14",
							rx: "4",
							fill: "#1e293b"
						}), /* @__PURE__ */ jsxs("text", {
							textAnchor: "middle",
							y: "3",
							fontSize: "9",
							fill: "white",
							fontWeight: "900",
							children: [Math.round(d.userVal * 100), "%"]
						})]
					}),
					isIndustryHovered && /* @__PURE__ */ jsxs("g", {
						transform: `translate(${ip.x}, ${ip.y + iOffset})`,
						children: [/* @__PURE__ */ jsx("rect", {
							x: "-18",
							y: "-7",
							width: "36",
							height: "14",
							rx: "4",
							fill: "#065f46"
						}), /* @__PURE__ */ jsxs("text", {
							textAnchor: "middle",
							y: "3",
							fontSize: "9",
							fill: "white",
							fontWeight: "900",
							children: [Math.round(d.industryVal * 100), "%"]
						})]
					})
				] }, i);
			}),
			data.map((d, i) => {
				const lp = labelPoint(i);
				const cos = Math.cos(lp.angle);
				let anchor = "middle";
				if (cos > .2) anchor = "start";
				else if (cos < -.2) anchor = "end";
				const label = d.label;
				let lines = [label];
				if (label.length > 15 || label.includes(" / ") || label.includes(" & ")) {
					if (label.includes(" / ")) lines = label.split(" / ").map((s, idx, arr) => idx < arr.length - 1 ? s + " /" : s);
					else if (label.includes(" & ")) lines = label.split(" & ").map((s, idx, arr) => idx < arr.length - 1 ? s + " &" : s);
					else if (label.includes(" ")) {
						const mid = Math.floor(label.length / 2);
						const spaceIdx = label.indexOf(" ", mid - 3);
						if (spaceIdx !== -1) lines = [label.substring(0, spaceIdx), label.substring(spaceIdx + 1)];
					}
				}
				return /* @__PURE__ */ jsx("text", {
					x: lp.x,
					y: lp.y - (lines.length - 1) * 6,
					textAnchor: anchor,
					dominantBaseline: "middle",
					fontSize: "10",
					fontWeight: "700",
					fill: hoveredPoint?.idx === i ? "#1e293b" : "#475569",
					fontFamily: "'Geist', sans-serif",
					className: "transition-colors duration-200",
					children: lines.map((line, idx) => /* @__PURE__ */ jsx("tspan", {
						x: lp.x,
						dy: idx === 0 ? 0 : 12,
						children: line
					}, idx))
				}, d.label);
			})
		]
	});
}
function SkillGapBar({ item }) {
	const userPct = item.user_score;
	item.market_demand;
	const badgeColor = item.status === "strong" ? "bg-emerald-500" : item.status === "developing" ? "bg-amber-500" : "bg-rose-500";
	return /* @__PURE__ */ jsxs("div", {
		className: "py-4 border-b border-slate-50 last:border-0 group",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex justify-between items-center mb-3",
				children: [/* @__PURE__ */ jsx("h4", {
					className: "text-[16px] font-black text-[#1A1A2E] leading-tight group-hover:text-indigo-900 transition-colors",
					children: item.skill
				}), /* @__PURE__ */ jsx("div", { className: `w-3 h-3 rounded-lg ${badgeColor} shadow-sm shadow-black/5` })]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex justify-between items-end mb-2",
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-[12px] font-bold text-slate-400",
					children: "Progress"
				}), /* @__PURE__ */ jsxs("div", {
					className: "text-[12px] font-black text-slate-600",
					children: [
						/* @__PURE__ */ jsx("span", { children: item.user_score }),
						/* @__PURE__ */ jsx("span", {
							className: "text-slate-300 mx-0.5",
							children: "/"
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "text-slate-400",
							children: [item.market_demand, "%"]
						})
					]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "h-2.5 w-full bg-slate-100 rounded-lg overflow-hidden",
				children: /* @__PURE__ */ jsx("div", {
					className: `h-full rounded-lg transition-all duration-1000 ${item.status === "strong" ? "bg-emerald-500" : "bg-indigo-600"}`,
					style: { width: `${userPct}%` }
				})
			})
		]
	});
}
function UploadForm({ target, setTarget, mode, setMode, pasteText, setPasteText, dragging, onDragOver, onDragLeave, onDrop, onFileChange, onAnalyze, loading, fileInputRef, file, onRemoveFile, previewUrl, availableTargets }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "grid grid-cols-1 md:grid-cols-5 gap-5",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "md:col-span-3 bg-white rounded-lg p-7 shadow-sm border border-slate-100",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "text-[18px] font-black text-[#1A1A2E] mb-1",
						children: "Analisis CV"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-[13px] text-slate-400 mb-6",
						children: "Upload file atau paste text CV kamu."
					}),
					/* @__PURE__ */ jsx("label", {
						className: "block text-[12px] font-semibold text-slate-500 mb-1.5",
						children: "Target Karir"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "relative mb-5",
						children: [/* @__PURE__ */ jsx("select", {
							value: target,
							onChange: (e) => setTarget(e.target.value),
							className: "w-full appearance-none border border-slate-200 rounded-lg px-5 py-3 text-[13px] font-semibold text-[#1A1A2E] bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10",
							children: availableTargets.map((t) => /* @__PURE__ */ jsx("option", {
								value: t,
								children: t
							}, t))
						}), /* @__PURE__ */ jsx("svg", {
							className: "absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400",
							width: "14",
							height: "14",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2.5",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: /* @__PURE__ */ jsx("path", { d: "m6 9 6 6 6-6" })
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex rounded-lg border border-slate-200 overflow-hidden mb-5 p-0.5 bg-slate-50",
						children: [/* @__PURE__ */ jsx("button", {
							onClick: () => setMode("upload"),
							className: `flex-1 py-2.5 rounded-lg text-[13px] font-semibold transition-all ${mode === "upload" ? "bg-indigo-900 text-white shadow-md" : "text-slate-500 hover:text-[#2563EB]"}`,
							children: "Upload File"
						}), /* @__PURE__ */ jsx("button", {
							onClick: () => setMode("paste"),
							className: `flex-1 py-2.5 rounded-lg text-[13px] font-semibold transition-all ${mode === "paste" ? "bg-indigo-900 text-white shadow-md" : "text-slate-500 hover:text-[#2563EB]"}`,
							children: "Paste Text"
						})]
					}),
					mode === "upload" ? file ? /* @__PURE__ */ jsxs("div", {
						className: "border-2 border-slate-100 rounded-lg p-4 bg-slate-50 relative group",
						children: [
							/* @__PURE__ */ jsx("button", {
								onClick: onRemoveFile,
								className: "absolute -top-2 -right-2 w-8 h-8 bg-rose-500 text-white rounded-lg flex items-center justify-center shadow-lg hover:bg-rose-600 transition-colors z-10",
								children: /* @__PURE__ */ jsxs("svg", {
									width: "16",
									height: "16",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "3",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									children: [/* @__PURE__ */ jsx("line", {
										x1: "18",
										y1: "6",
										x2: "6",
										y2: "18"
									}), /* @__PURE__ */ jsx("line", {
										x1: "6",
										y1: "6",
										x2: "18",
										y2: "18"
									})]
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-4 mb-4 p-3 bg-white rounded-lg border border-slate-100",
								children: [/* @__PURE__ */ jsx("div", {
									className: "w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600",
									children: /* @__PURE__ */ jsxs("svg", {
										width: "24",
										height: "24",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										strokeLinecap: "round",
										strokeLinejoin: "round",
										children: [/* @__PURE__ */ jsx("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }), /* @__PURE__ */ jsx("polyline", { points: "14 2 14 8 20 8" })]
									})
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-[13px] font-bold text-slate-700 truncate",
										children: file.name
									}), /* @__PURE__ */ jsxs("p", {
										className: "text-[11px] text-slate-400",
										children: [(file.size / 1024).toFixed(1), " KB • PDF Document"]
									})]
								})]
							}),
							file.type === "application/pdf" && previewUrl ? /* @__PURE__ */ jsx("div", {
								className: "aspect-[4/3] w-full rounded-lg overflow-hidden border border-slate-200 bg-white",
								children: /* @__PURE__ */ jsx("iframe", {
									src: `${previewUrl}#toolbar=0&navpanes=0&scrollbar=0`,
									className: "w-full h-full border-none",
									title: "CV Preview"
								})
							}) : /* @__PURE__ */ jsx("div", {
								className: "py-10 flex flex-col items-center justify-center bg-white rounded-lg border border-slate-200 border-dashed",
								children: /* @__PURE__ */ jsx("p", {
									className: "text-[12px] text-slate-400 italic",
									children: "Preview tidak tersedia untuk format ini"
								})
							})
						]
					}) : /* @__PURE__ */ jsxs("div", {
						onDragOver,
						onDragLeave,
						onDrop,
						onClick: () => fileInputRef.current?.click(),
						className: `border-2 border-dashed rounded-lg flex flex-col items-center justify-center py-10 cursor-pointer transition-all ${dragging ? "border-[#2563EB] bg-indigo-900" : "border-slate-200 hover:border-[#2563EB] hover:bg-indigo-900/40"}`,
						children: [
							/* @__PURE__ */ jsxs("svg", {
								className: `mb-3 ${dragging ? "text-white" : "text-slate-400"}`,
								width: "32",
								height: "32",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "1.8",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								children: [
									/* @__PURE__ */ jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
									/* @__PURE__ */ jsx("polyline", { points: "17 8 12 3 7 8" }),
									/* @__PURE__ */ jsx("line", {
										x1: "12",
										y1: "3",
										x2: "12",
										y2: "15"
									})
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: `text-[13px] font-semibold ${dragging ? "text-white" : "text-slate-600"}`,
								children: "Klik atau drag cv ke sini."
							}),
							/* @__PURE__ */ jsx("p", {
								className: `text-[11px] mt-1 ${dragging ? "text-indigo-100" : "text-slate-400"}`,
								children: "PDF, DOCS, TXT"
							}),
							/* @__PURE__ */ jsx("input", {
								ref: fileInputRef,
								type: "file",
								className: "hidden",
								accept: ".pdf,.doc,.docx,.txt",
								onChange: onFileChange
							})
						]
					}) : /* @__PURE__ */ jsx("textarea", {
						value: pasteText,
						onChange: (e) => setPasteText(e.target.value),
						rows: 7,
						placeholder: "Paste isi CV kamu di sini...",
						className: "w-full border border-slate-200 rounded-lg px-5 py-4 text-[13px] text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none placeholder:text-slate-300"
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: onAnalyze,
						disabled: loading,
						className: "mt-5 w-full bg-indigo-900 text-white py-3 rounded-lg text-[13px] font-bold hover:bg-indigo-900 transition-colors shadow-md shadow-blue-200 disabled:opacity-60 flex items-center justify-center gap-2",
						children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("svg", {
							className: "animate-spin",
							width: "16",
							height: "16",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2.5",
							children: /* @__PURE__ */ jsx("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" })
						}), "Menganalisis..."] }) : "Analisis CV"
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "md:col-span-2 bg-white rounded-lg p-7 shadow-sm border border-slate-100 flex flex-col",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-[18px] font-black text-[#1A1A2E] mb-auto",
					children: "Hasil Analisis CV"
				}), /* @__PURE__ */ jsx("div", {
					className: "flex-1 flex items-center justify-center",
					children: /* @__PURE__ */ jsxs("p", {
						className: "text-[13px] text-slate-300 text-center leading-relaxed",
						children: [
							"Upload dan analisa CV",
							/* @__PURE__ */ jsx("br", {}),
							"untuk mendapatkan hasil"
						]
					})
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "md:col-span-5 bg-white rounded-lg px-8 py-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
					className: "text-[18px] font-black text-[#1A1A2E] mb-1",
					children: "Rekomendasi dari AI"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-[13px] text-slate-400",
					children: "Upload dan analisis CV anda untuk mendapatkan rekomendasi."
				})] }), /* @__PURE__ */ jsx("button", {
					className: "bg-indigo-900 text-white px-6 py-2.5 rounded-lg text-[13px] font-bold shadow-md hover:bg-indigo-900 transition-colors flex-shrink-0",
					children: "Roadmap"
				})]
			})
		]
	});
}
function CareerPathCard({ pos }) {
	const [expanded, setExpanded] = useState(false);
	return /* @__PURE__ */ jsxs("div", {
		onClick: () => setExpanded(!expanded),
		className: `p-5 rounded-lg border transition-all cursor-pointer group ${expanded ? "border-indigo-200 bg-white shadow-xl scale-[1.01] ring-4 ring-indigo-50/50" : "border-slate-50 bg-slate-50/50 hover:bg-white hover:border-indigo-100 hover:shadow-lg"}`,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex justify-between items-start",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex-1 min-w-0 pr-4",
				children: [/* @__PURE__ */ jsx("h3", {
					className: `text-[16px] font-black transition-colors truncate ${expanded ? "text-indigo-900" : "text-[#1A1A2E]"}`,
					children: pos.title
				}), !expanded && /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-1.5 mt-1.5",
					children: [/* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-lg bg-indigo-400 animate-pulse" }), /* @__PURE__ */ jsx("p", {
						className: "text-[10px] font-bold text-slate-400",
						children: "Detail Jalur Karir"
					})]
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col items-end gap-1 flex-shrink-0",
				children: [/* @__PURE__ */ jsxs("span", {
					className: `text-[18px] font-black transition-colors ${expanded ? "text-indigo-600" : "text-indigo-900"}`,
					children: [pos.match_percentage, "%"]
				}), /* @__PURE__ */ jsx("span", {
					className: "text-[9px] font-black text-slate-300 leading-none",
					children: "Match"
				})]
			})]
		}), expanded && /* @__PURE__ */ jsxs("div", {
			className: "mt-5 pt-5 border-t border-slate-100 animate-in fade-in slide-in-from-top-3 duration-500",
			children: [/* @__PURE__ */ jsx("div", {
				className: "bg-indigo-50/50 p-4 rounded-lg border border-indigo-100/30 mb-5",
				children: /* @__PURE__ */ jsxs("p", {
					className: "text-[12px] text-slate-600 leading-relaxed font-medium italic",
					children: [
						"\"",
						pos.description,
						"\""
					]
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-[10px] font-black text-slate-400",
						children: "Skill yang Diperlukan"
					}), /* @__PURE__ */ jsx("span", {
						className: "text-[9px] font-bold text-indigo-400 bg-indigo-50 px-2 py-0.5 rounded-lg",
						children: "AI Recommendation"
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "flex flex-wrap gap-2",
					children: (pos.required_skills || []).map((s, i) => /* @__PURE__ */ jsx("span", {
						className: "text-[10px] font-bold bg-white px-3 py-1.5 rounded-lg text-indigo-900 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-sm",
						children: s
					}, i))
				})]
			})]
		})]
	});
}
function AnalysisResults({ profile, onReset }) {
	const radarData = (profile?.skill_gaps || []).slice(0, 6).map((g) => ({
		label: g.skill,
		userVal: (g.user_score || 10) / 100,
		industryVal: (g.market_demand || 80) / 100
	}));
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 md:grid-cols-5 gap-5",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "md:col-span-3 bg-white rounded-lg p-7 shadow-sm border border-slate-100",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-start justify-between mb-2",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
								className: "text-[18px] font-black text-[#1A1A2E]",
								children: "Analisis Kompetensi"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-[13px] text-slate-400",
								children: "Perbandingan skill kamu dengan standar industri."
							})] }), /* @__PURE__ */ jsx("button", {
								onClick: onReset,
								className: "text-[12px] text-indigo-900 font-semibold border border-indigo-900 px-4 py-1.5 rounded-lg hover:bg-indigo-900 hover:text-white transition-colors flex-shrink-0",
								children: "Update CV"
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "py-4",
							children: /* @__PURE__ */ jsx(RadarChart$1, { data: radarData })
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-center gap-6 mt-2",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("div", { className: "w-5 h-2.5 rounded-lg bg-indigo-900" }), /* @__PURE__ */ jsx("span", {
									className: "text-[11px] text-slate-500 font-medium",
									children: "Skill Kamu"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("div", { className: "w-5 h-2.5 rounded-lg bg-emerald-500" }), /* @__PURE__ */ jsx("span", {
									className: "text-[11px] text-slate-500 font-medium",
									children: "Standar Industri"
								})]
							})]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "md:col-span-2 bg-white rounded-lg p-7 shadow-sm border border-slate-100 flex flex-col",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "text-[18px] font-black text-[#1A1A2E] mb-1",
							children: "Skill Gap Analysis"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-[12px] text-slate-400 font-semibold mb-4",
							children: "Kebutuhan Pasar"
						}),
						/* @__PURE__ */ jsx("div", {
							className: "space-y-5 flex-1 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar",
							children: profile?.skill_gaps && profile.skill_gaps.length > 0 ? profile.skill_gaps.map((item, idx) => /* @__PURE__ */ jsx(SkillGapBar, { item }, idx)) : /* @__PURE__ */ jsx("div", {
								className: "py-10 flex flex-col items-center justify-center text-center",
								children: /* @__PURE__ */ jsx("p", {
									className: "text-[12px] text-slate-400 italic",
									children: "Belum ada data skill gap."
								})
							})
						}),
						/* @__PURE__ */ jsx(Link, {
							href: route("roadmap"),
							className: "mt-6 w-full bg-indigo-900 text-white py-3 rounded-lg text-[13px] font-bold hover:bg-indigo-800 transition-all text-center shadow-lg shadow-indigo-100",
							children: "Buka Roadmap Belajar"
						})
					]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-lg px-8 py-7 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-6",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "w-16 h-16 rounded-lg bg-indigo-900 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-100",
						children: /* @__PURE__ */ jsx("svg", {
							width: "32",
							height: "32",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "white",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" })
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex-1 text-center sm:text-left",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "text-[18px] font-black text-[#1A1A2E] mb-1",
							children: "Optimasi CV dari AI"
						}), /* @__PURE__ */ jsxs("p", {
							className: "text-[13px] text-slate-500 leading-relaxed italic",
							children: [
								"\"",
								profile?.smart_tips || "AI sedang menyiapkan tips optimasi khusus untuk CV-mu...",
								"\""
							]
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex flex-col gap-2 w-full sm:w-auto",
						children: /* @__PURE__ */ jsx(Link, {
							href: route("profile.edit"),
							className: "bg-white text-indigo-900 border border-slate-200 px-6 py-2.5 rounded-lg text-[13px] font-bold hover:bg-slate-50 transition-all text-center",
							children: "Edit Profil"
						})
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 md:grid-cols-12 gap-5",
				children: /* @__PURE__ */ jsxs("div", {
					className: "md:col-span-12 bg-white rounded-lg p-8 shadow-sm border border-slate-100",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "text-[20px] font-black text-[#1A1A2E] mb-2",
							children: "Posisi Alternatif & Karir Path"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-[13px] text-slate-400 mb-8 max-w-2xl",
							children: "Berdasarkan kombinasi skill-mu, AI menemukan beberapa jalur karir alternatif yang memiliki kecocokan tinggi dengan profilmu saat ini."
						}),
						/* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
							children: profile?.career_paths && profile.career_paths.length > 0 ? profile.career_paths.map((pos, idx) => /* @__PURE__ */ jsx(CareerPathCard, { pos }, idx)) : /* @__PURE__ */ jsxs("div", {
								className: "col-span-full py-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-lg bg-slate-50/30",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "w-16 h-16 rounded-lg bg-slate-100 flex items-center justify-center mb-4",
										children: /* @__PURE__ */ jsxs("svg", {
											width: "24",
											height: "24",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "#94a3b8",
											strokeWidth: "2",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											children: [
												/* @__PURE__ */ jsx("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
												/* @__PURE__ */ jsx("circle", {
													cx: "9",
													cy: "7",
													r: "4"
												}),
												/* @__PURE__ */ jsx("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }),
												/* @__PURE__ */ jsx("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
											]
										})
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-[13px] font-bold text-slate-400",
										children: "Belum ada jalur karir alternatif"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-[11px] text-slate-300 mt-1",
										children: "Coba update CV kamu untuk mendapatkan rekomendasi baru"
									})
								]
							})
						})
					]
				})
			})
		]
	});
}
function SkillGapAnalysis({ profile, analysisProcessing, analysisProcessingError }) {
	const availableTargets = profile?.career_target && profile.career_target.length > 0 ? Array.isArray(profile.career_target) ? profile.career_target : [profile.career_target] : DEFAULT_CAREER_TARGETS;
	const { data, setData, post, processing } = useForm({
		cv_text: "",
		cv_file: null,
		career_target: [availableTargets[0]]
	});
	const [mode, setMode] = useState("upload");
	const [dragging, setDragging] = useState(false);
	const [showUpload, setShowUpload] = useState(!profile?.skill_gaps || profile?.skill_gaps?.length === 0);
	const [previewUrl, setPreviewUrl] = useState(null);
	const fileInputRef = useRef(null);
	useEffect(() => {
		if (profile?.skill_gaps) console.debug("[Analysis] CV analysis result", {
			skills: profile?.skills,
			skillGaps: profile?.skill_gaps,
			careerPaths: profile?.career_paths,
			smartTips: profile?.smart_tips,
			education: profile?.education,
			experiences: profile?.experiences
		});
	}, [profile?.skill_gaps]);
	useEffect(() => {
		if (data.cv_file) {
			const url = URL.createObjectURL(data.cv_file);
			setPreviewUrl(url);
			return () => URL.revokeObjectURL(url);
		} else setPreviewUrl(null);
	}, [data.cv_file]);
	const handleDragOver = useCallback((e) => {
		e.preventDefault();
		setDragging(true);
	}, []);
	const handleDragLeave = useCallback(() => setDragging(false), []);
	const handleDrop = useCallback((e) => {
		e.preventDefault();
		setDragging(false);
		if (e.dataTransfer.files.length > 0) setData("cv_file", e.dataTransfer.files[0]);
	}, []);
	const handleFileChange = useCallback((e) => {
		if (e.target.files && e.target.files.length > 0) setData("cv_file", e.target.files[0]);
	}, []);
	const handleAnalyze = () => {
		post(route("analysis.store"), {
			forceFormData: true,
			onSuccess: () => {
				setShowUpload(false);
			}
		});
	};
	if (analysisProcessing) return /* @__PURE__ */ jsxs(AppLayout, {
		header: "Skill Gap Analysis",
		children: [/* @__PURE__ */ jsx(Head, { title: "Menganalisis CV... | Kembangin" }), /* @__PURE__ */ jsxs("div", {
			className: "max-w-full mx-auto pt-20 text-center",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "relative inline-block mb-8",
					children: [/* @__PURE__ */ jsx("div", {
						className: "w-24 h-24 rounded-lg bg-indigo-900 animate-pulse flex items-center justify-center shadow-xl shadow-indigo-100",
						children: /* @__PURE__ */ jsx("svg", {
							className: "animate-spin text-white",
							width: "40",
							height: "40",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "3",
							children: /* @__PURE__ */ jsx("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" })
						})
					}), /* @__PURE__ */ jsx("div", {
						className: "absolute -bottom-2 -right-2 w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center border-4 border-white",
						children: /* @__PURE__ */ jsx("svg", {
							width: "20",
							height: "20",
							viewBox: "0 0 24 24",
							fill: "white",
							children: /* @__PURE__ */ jsx("path", { d: "M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" })
						})
					})]
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "text-2xl font-black text-slate-900 mb-2",
					children: "AI Sedang Menganalisis CV-mu"
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "text-slate-500 max-w-md mx-auto leading-relaxed",
					children: [
						"Mohon tunggu sebentar, kami sedang memetakan skill kamu dengan standar industri terbaru untuk jalur ",
						/* @__PURE__ */ jsx("span", {
							className: "text-indigo-900 font-bold",
							children: data.career_target[0]
						}),
						"."
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-10 flex flex-col gap-4 max-w-xs mx-auto",
					children: [/* @__PURE__ */ jsx("div", {
						className: "h-1 bg-slate-100 rounded-lg overflow-hidden",
						children: /* @__PURE__ */ jsx("div", {
							className: "h-full bg-indigo-900 w-1/2 animate-shimmer",
							style: {
								backgroundSize: "200% 100%",
								backgroundImage: "linear-gradient(90deg, #312e81 25%, #4338ca 50%, #312e81 75%)"
							}
						})
					}), /* @__PURE__ */ jsx("p", {
						className: "text-[10px] font-bold text-slate-400 tracking-widest",
						children: "Processing Market Data & Skill Gaps"
					})]
				})
			]
		})]
	});
	return /* @__PURE__ */ jsxs(AppLayout, {
		header: "Skill Gap Analysis",
		children: [/* @__PURE__ */ jsx(Head, { title: "Skill Gap Analysis | Kembangin" }), /* @__PURE__ */ jsxs("div", {
			className: "max-w-full mx-auto pt-4",
			children: [analysisProcessingError && /* @__PURE__ */ jsxs("div", {
				className: "mb-6 p-4 bg-rose-50 border border-rose-100 rounded-lg flex items-center gap-4 text-rose-600",
				children: [/* @__PURE__ */ jsxs("svg", {
					width: "20",
					height: "20",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2.5",
					children: [
						/* @__PURE__ */ jsx("circle", {
							cx: "12",
							cy: "12",
							r: "10"
						}),
						/* @__PURE__ */ jsx("line", {
							x1: "12",
							y1: "8",
							x2: "12",
							y2: "12"
						}),
						/* @__PURE__ */ jsx("line", {
							x1: "12",
							y1: "16",
							x2: "12.01",
							y2: "16"
						})
					]
				}), /* @__PURE__ */ jsx("p", {
					className: "text-[13px] font-bold",
					children: analysisProcessingError
				})]
			}), profile?.skill_gaps?.length > 0 && !showUpload ? /* @__PURE__ */ jsx(AnalysisResults, {
				profile,
				onReset: () => setShowUpload(true)
			}) : /* @__PURE__ */ jsx(UploadForm, {
				target: data.career_target[0],
				setTarget: (v) => setData("career_target", [v]),
				mode,
				setMode,
				pasteText: data.cv_text,
				setPasteText: (v) => setData("cv_text", v),
				dragging,
				onDragOver: handleDragOver,
				onDragLeave: handleDragLeave,
				onDrop: handleDrop,
				onFileChange: handleFileChange,
				onAnalyze: handleAnalyze,
				loading: processing,
				fileInputRef,
				file: data.cv_file,
				onRemoveFile: () => setData("cv_file", null),
				previewUrl,
				availableTargets
			})]
		})]
	});
}
//#endregion
//#region resources/js/Components/InputError.tsx
function InputError({ message, className = "", ...props }) {
	return message ? /* @__PURE__ */ jsx("p", {
		...props,
		className: "text-sm text-red-600 dark:text-red-400 " + className,
		children: message
	}) : null;
}
//#endregion
//#region resources/js/Components/InputLabel.tsx
function InputLabel({ value, className = "", children, ...props }) {
	return /* @__PURE__ */ jsx("label", {
		...props,
		className: `block text-sm font-medium text-gray-700 dark:text-gray-300 ` + className,
		children: value ? value : children
	});
}
//#endregion
//#region resources/js/Components/PrimaryButton.tsx
function PrimaryButton({ className = "", disabled, children, ...props }) {
	return /* @__PURE__ */ jsx("button", {
		...props,
		className: `inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300 ${disabled && "opacity-25"} ` + className,
		disabled,
		children
	});
}
//#endregion
//#region resources/js/Components/TextInput.tsx
var TextInput_default = forwardRef(function TextInput({ type = "text", className = "", isFocused = false, ...props }, ref) {
	const localRef = useRef(null);
	useImperativeHandle(ref, () => ({ focus: () => localRef.current?.focus() }));
	useEffect(() => {
		if (isFocused) localRef.current?.focus();
	}, [isFocused]);
	return /* @__PURE__ */ jsx("input", {
		...props,
		type,
		className: "rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 " + className,
		ref: localRef
	});
});
//#endregion
//#region resources/js/Layouts/GuestLayout.tsx
function Guest({ children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "h-screen overflow-hidden flex dashboard-font selection:bg-primary selection:text-white bg-white text-slate-900",
		children: [/* @__PURE__ */ jsx("div", {
			className: "hidden lg:flex w-1/2 relative flex-col justify-center items-center overflow-hidden h-full z-10 border-r border-slate-100 bg-gradient-to-br from-slate-950 via-[#0c1236] to-[#0a0f2b]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "relative z-10 w-full max-w-xl mx-auto flex flex-col justify-center h-full p-12 xl:p-16",
				children: [/* @__PURE__ */ jsx("div", {
					className: "animate-fade-in-up",
					children: /* @__PURE__ */ jsxs(Link, {
						href: "/",
						className: "inline-flex items-center gap-3 group",
						children: [/* @__PURE__ */ jsx("div", {
							className: "w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-110",
							children: /* @__PURE__ */ jsx("img", {
								src: "/logo1.svg",
								alt: "Logo",
								className: "w-6 h-6 object-contain invert brightness-0"
							})
						}), /* @__PURE__ */ jsx("span", {
							className: "text-xl font-bold tracking-tight text-white font-[family-name:var(--font-heading)]",
							children: "Kembangin"
						})]
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "animate-fade-in-up",
					style: { animationDelay: "100ms" },
					children: [/* @__PURE__ */ jsx("h1", {
						className: "text-5xl xl:text-7xl font-black text-white leading-tight mb-8 mt-6 tracking-tight",
						children: "Selamat Datang di Kembangin"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-slate-400 text-xl leading-relaxed max-w-md font-medium",
						children: "Akselerasi karier digital Anda dengan diagnosis AI yang presisi dan roadmap belajar yang adaptif sesuai standar industri."
					})]
				})]
			})
		}), /* @__PURE__ */ jsx("div", {
			className: "w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-8 lg:p-12 relative z-10 h-full overflow-y-auto bg-white text-slate-800",
			children: /* @__PURE__ */ jsxs("div", {
				className: "w-full max-w-md py-4",
				children: [/* @__PURE__ */ jsxs(Link, {
					href: "/",
					className: "lg:hidden inline-flex items-center gap-3 mb-8 group",
					children: [/* @__PURE__ */ jsx("div", {
						className: "w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-110",
						children: /* @__PURE__ */ jsx("img", {
							src: "/logo1.svg",
							alt: "Logo",
							className: "w-6 h-6 object-contain invert brightness-0"
						})
					}), /* @__PURE__ */ jsx("span", {
						className: "text-2xl font-black tracking-tight text-navy-900",
						children: "Kembangin"
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "bg-white p-8 sm:p-10 rounded-3xl relative",
					children: [/* @__PURE__ */ jsx("div", { className: "absolute -inset-1 bg-gradient-to-br from-primary/10 to-navy-900/5 rounded-3xl blur-xl -z-10" }), children]
				})]
			})
		})]
	});
}
//#endregion
//#region resources/js/Pages/Auth/ConfirmPassword.tsx
var ConfirmPassword_exports = /* @__PURE__ */ __exportAll({ default: () => ConfirmPassword });
function ConfirmPassword() {
	const { data, setData, post, processing, errors, reset } = useForm({ password: "" });
	const submit = (e) => {
		e.preventDefault();
		post(route("password.confirm"), { onFinish: () => reset("password") });
	};
	return /* @__PURE__ */ jsxs(Guest, { children: [
		/* @__PURE__ */ jsx(Head, { title: "Confirm Password" }),
		/* @__PURE__ */ jsx("div", {
			className: "mb-4 text-sm text-gray-600 dark:text-gray-400",
			children: "This is a secure area of the application. Please confirm your password before continuing."
		}),
		/* @__PURE__ */ jsxs("form", {
			onSubmit: submit,
			children: [/* @__PURE__ */ jsxs("div", {
				className: "mt-4",
				children: [
					/* @__PURE__ */ jsx(InputLabel, {
						htmlFor: "password",
						value: "Password"
					}),
					/* @__PURE__ */ jsx(TextInput_default, {
						id: "password",
						type: "password",
						name: "password",
						value: data.password,
						className: "mt-1 block w-full",
						isFocused: true,
						onChange: (e) => setData("password", e.target.value)
					}),
					/* @__PURE__ */ jsx(InputError, {
						message: errors.password,
						className: "mt-2"
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "mt-4 flex items-center justify-end",
				children: /* @__PURE__ */ jsx(PrimaryButton, {
					className: "ms-4",
					disabled: processing,
					children: "Confirm"
				})
			})]
		})
	] });
}
//#endregion
//#region resources/js/Pages/Auth/ForgotPassword.tsx
var ForgotPassword_exports = /* @__PURE__ */ __exportAll({ default: () => ForgotPassword });
function ForgotPassword({ status }) {
	const { data, setData, post, processing, errors } = useForm({ email: "" });
	const submit = (e) => {
		e.preventDefault();
		post(route("password.email"));
	};
	return /* @__PURE__ */ jsxs(Guest, { children: [
		/* @__PURE__ */ jsx(Head, { title: "Forgot Password" }),
		/* @__PURE__ */ jsx("div", {
			className: "mb-4 text-sm text-gray-600 dark:text-gray-400",
			children: "Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one."
		}),
		status && /* @__PURE__ */ jsx("div", {
			className: "mb-4 text-sm font-medium text-green-600 dark:text-green-400",
			children: status
		}),
		/* @__PURE__ */ jsxs("form", {
			onSubmit: submit,
			children: [
				/* @__PURE__ */ jsx(TextInput_default, {
					id: "email",
					type: "email",
					name: "email",
					value: data.email,
					className: "mt-1 block w-full",
					isFocused: true,
					onChange: (e) => setData("email", e.target.value)
				}),
				/* @__PURE__ */ jsx(InputError, {
					message: errors.email,
					className: "mt-2"
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-4 flex items-center justify-end",
					children: /* @__PURE__ */ jsx(PrimaryButton, {
						className: "ms-4",
						disabled: processing,
						children: "Email Password Reset Link"
					})
				})
			]
		})
	] });
}
//#endregion
//#region resources/js/Components/Checkbox.tsx
function Checkbox({ className = "", ...props }) {
	return /* @__PURE__ */ jsx("input", {
		...props,
		type: "checkbox",
		className: "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800 " + className
	});
}
//#endregion
//#region resources/js/Pages/Auth/Login.tsx
var Login_exports = /* @__PURE__ */ __exportAll({ default: () => Login });
function Login({ status, canResetPassword }) {
	const { data, setData, post, processing, errors, reset } = useForm({
		email: "",
		password: "",
		remember: false
	});
	const submit = (e) => {
		e.preventDefault();
		post(route("login"), { onFinish: () => reset("password") });
	};
	return /* @__PURE__ */ jsxs(Guest, { children: [
		/* @__PURE__ */ jsx(Head, { title: "Masuk Akun" }),
		status && /* @__PURE__ */ jsx("div", {
			className: "mb-6 p-4 bg-emerald-50 border border-emerald-200 text-sm font-bold text-emerald-600 rounded-xl",
			children: status
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mb-8",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "text-3xl font-black text-slate-950 mb-2 tracking-tight",
				children: "Selamat Datang"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-slate-500 font-medium tracking-tight",
				children: "Masuk untuk melanjutkan kemajuan karier Anda."
			})]
		}),
		/* @__PURE__ */ jsxs("form", {
			onSubmit: submit,
			className: "space-y-6",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("label", {
						htmlFor: "email",
						className: "block text-[13px] font-bold text-slate-700 mb-2 uppercase tracking-wider",
						children: "Alamat Email"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsx("div", {
							className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400",
							children: /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5" })
						}), /* @__PURE__ */ jsx("input", {
							id: "email",
							type: "email",
							name: "email",
							value: data.email,
							className: "bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-primary focus:border-primary block w-full pl-11 p-4 transition-all focus:bg-white shadow-sm",
							autoComplete: "username",
							onChange: (e) => setData("email", e.target.value),
							placeholder: "nama@email.com",
							required: true
						})]
					}),
					/* @__PURE__ */ jsx(InputError, {
						message: errors.email,
						className: "mt-2"
					})
				] }),
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("label", {
						htmlFor: "password",
						className: "block text-[13px] font-bold text-slate-700 mb-2 uppercase tracking-wider",
						children: "Password"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsx("div", {
							className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400",
							children: /* @__PURE__ */ jsx(Lock, { className: "w-5 h-5" })
						}), /* @__PURE__ */ jsx("input", {
							id: "password",
							type: "password",
							name: "password",
							value: data.password,
							className: "bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-primary focus:border-primary block w-full pl-11 p-4 transition-all focus:bg-white shadow-sm",
							autoComplete: "current-password",
							onChange: (e) => setData("password", e.target.value),
							placeholder: "••••••••",
							required: true
						})]
					}),
					/* @__PURE__ */ jsx(InputError, {
						message: errors.password,
						className: "mt-2"
					})
				] }),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ jsxs("label", {
						className: "flex items-center cursor-pointer group",
						children: [/* @__PURE__ */ jsx(Checkbox, {
							name: "remember",
							checked: data.remember,
							onChange: (e) => setData("remember", e.target.checked),
							className: "rounded border-slate-300 text-primary focus:ring-primary w-5 h-5"
						}), /* @__PURE__ */ jsx("span", {
							className: "ms-3 text-sm font-bold text-slate-600 group-hover:text-primary transition-colors",
							children: "Ingat sesi saya"
						})]
					}), canResetPassword && /* @__PURE__ */ jsx(Link, {
						href: route("password.request"),
						className: "text-sm font-bold text-primary hover:text-primary-dark underline-offset-4 hover:underline transition-all",
						children: "Lupa Password?"
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "pt-2",
					children: /* @__PURE__ */ jsxs("button", {
						disabled: processing,
						className: "w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed group",
						children: [
							/* @__PURE__ */ jsx(LogIn, { className: "w-5 h-5" }),
							"Masuk Sekarang",
							/* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" })
						]
					})
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "text-center text-sm font-medium text-slate-500 pt-4",
					children: [
						"Belum punya akun?",
						" ",
						/* @__PURE__ */ jsx(Link, {
							href: route("register"),
							className: "font-bold text-primary hover:text-primary-dark hover:underline underline-offset-4 transition-all",
							children: "Daftar Gratis"
						})
					]
				})
			]
		})
	] });
}
//#endregion
//#region resources/js/Pages/Auth/Register.tsx
var Register_exports = /* @__PURE__ */ __exportAll({ default: () => Register });
function Register() {
	const { data, setData, post, processing, errors, reset } = useForm({
		name: "",
		email: "",
		password: "",
		password_confirmation: ""
	});
	const submit = (e) => {
		e.preventDefault();
		post(route("register"), { onFinish: () => reset("password", "password_confirmation") });
	};
	return /* @__PURE__ */ jsxs(Guest, { children: [
		/* @__PURE__ */ jsx(Head, { title: "Daftar Akun" }),
		/* @__PURE__ */ jsxs("div", {
			className: "mb-8",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "text-3xl font-black text-slate-950 mb-2 tracking-tight",
				children: "Mulai Akselerasi"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-slate-500 font-medium tracking-tight",
				children: "Buat profil Anda dan dapatkan kurikulum belajar hari ini."
			})]
		}),
		/* @__PURE__ */ jsxs("form", {
			onSubmit: submit,
			className: "space-y-5",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("label", {
						htmlFor: "name",
						className: "block text-[13px] font-bold text-slate-700 mb-2 uppercase tracking-wider",
						children: "Nama Lengkap"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsx("div", {
							className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400",
							children: /* @__PURE__ */ jsx(User, { className: "w-5 h-5" })
						}), /* @__PURE__ */ jsx("input", {
							id: "name",
							type: "text",
							name: "name",
							value: data.name,
							className: "bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-primary focus:border-primary block w-full pl-11 p-4 transition-all focus:bg-white shadow-sm",
							autoComplete: "name",
							onChange: (e) => setData("name", e.target.value),
							placeholder: "Nama Anda",
							required: true
						})]
					}),
					/* @__PURE__ */ jsx(InputError, {
						message: errors.name,
						className: "mt-2"
					})
				] }),
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("label", {
						htmlFor: "email",
						className: "block text-[13px] font-bold text-slate-700 mb-2 uppercase tracking-wider",
						children: "Alamat Email"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsx("div", {
							className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400",
							children: /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5" })
						}), /* @__PURE__ */ jsx("input", {
							id: "email",
							type: "email",
							name: "email",
							value: data.email,
							className: "bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-primary focus:border-primary block w-full pl-11 p-4 transition-all focus:bg-white shadow-sm",
							autoComplete: "username",
							onChange: (e) => setData("email", e.target.value),
							placeholder: "nama@email.com",
							required: true
						})]
					}),
					/* @__PURE__ */ jsx(InputError, {
						message: errors.email,
						className: "mt-2"
					})
				] }),
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 gap-5",
					children: [/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("label", {
							htmlFor: "password",
							className: "block text-[13px] font-bold text-slate-700 mb-2 uppercase tracking-wider",
							children: "Password"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "relative",
							children: [/* @__PURE__ */ jsx("div", {
								className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400",
								children: /* @__PURE__ */ jsx(Lock, { className: "w-5 h-5" })
							}), /* @__PURE__ */ jsx("input", {
								id: "password",
								type: "password",
								name: "password",
								value: data.password,
								className: "bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-primary focus:border-primary block w-full pl-11 p-4 transition-all focus:bg-white shadow-sm",
								autoComplete: "new-password",
								onChange: (e) => setData("password", e.target.value),
								placeholder: "••••••••",
								required: true
							})]
						}),
						/* @__PURE__ */ jsx(InputError, {
							message: errors.password,
							className: "mt-2"
						})
					] }), /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("label", {
							htmlFor: "password_confirmation",
							className: "block text-[13px] font-bold text-slate-700 mb-2 uppercase tracking-wider",
							children: "Ulangi Password"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "relative",
							children: [/* @__PURE__ */ jsx("div", {
								className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400",
								children: /* @__PURE__ */ jsx(Lock, { className: "w-5 h-5" })
							}), /* @__PURE__ */ jsx("input", {
								id: "password_confirmation",
								type: "password",
								name: "password_confirmation",
								value: data.password_confirmation,
								className: "bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-primary focus:border-primary block w-full pl-11 p-4 transition-all focus:bg-white shadow-sm",
								autoComplete: "new-password",
								onChange: (e) => setData("password_confirmation", e.target.value),
								placeholder: "••••••••",
								required: true
							})]
						}),
						/* @__PURE__ */ jsx(InputError, {
							message: errors.password_confirmation,
							className: "mt-2"
						})
					] })]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "pt-4",
					children: /* @__PURE__ */ jsxs("button", {
						disabled: processing,
						className: "w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed group",
						children: [
							/* @__PURE__ */ jsx(UserPlus, { className: "w-5 h-5" }),
							"Buat Akun Sekarang",
							/* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" })
						]
					})
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "text-center text-sm font-medium text-slate-500 pt-2",
					children: [
						"Sudah punya akun?",
						" ",
						/* @__PURE__ */ jsx(Link, {
							href: route("login"),
							className: "font-bold text-primary hover:text-primary-dark hover:underline underline-offset-4 transition-all",
							children: "Masuk ke Dashboard"
						})
					]
				})
			]
		})
	] });
}
//#endregion
//#region resources/js/Pages/Auth/ResetPassword.tsx
var ResetPassword_exports = /* @__PURE__ */ __exportAll({ default: () => ResetPassword });
function ResetPassword({ token, email }) {
	const { data, setData, post, processing, errors, reset } = useForm({
		token,
		email,
		password: "",
		password_confirmation: ""
	});
	const submit = (e) => {
		e.preventDefault();
		post(route("password.store"), { onFinish: () => reset("password", "password_confirmation") });
	};
	return /* @__PURE__ */ jsxs(Guest, { children: [/* @__PURE__ */ jsx(Head, { title: "Reset Password" }), /* @__PURE__ */ jsxs("form", {
		onSubmit: submit,
		children: [
			/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx(InputLabel, {
					htmlFor: "email",
					value: "Email"
				}),
				/* @__PURE__ */ jsx(TextInput_default, {
					id: "email",
					type: "email",
					name: "email",
					value: data.email,
					className: "mt-1 block w-full",
					autoComplete: "username",
					onChange: (e) => setData("email", e.target.value)
				}),
				/* @__PURE__ */ jsx(InputError, {
					message: errors.email,
					className: "mt-2"
				})
			] }),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-4",
				children: [
					/* @__PURE__ */ jsx(InputLabel, {
						htmlFor: "password",
						value: "Password"
					}),
					/* @__PURE__ */ jsx(TextInput_default, {
						id: "password",
						type: "password",
						name: "password",
						value: data.password,
						className: "mt-1 block w-full",
						autoComplete: "new-password",
						isFocused: true,
						onChange: (e) => setData("password", e.target.value)
					}),
					/* @__PURE__ */ jsx(InputError, {
						message: errors.password,
						className: "mt-2"
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-4",
				children: [
					/* @__PURE__ */ jsx(InputLabel, {
						htmlFor: "password_confirmation",
						value: "Confirm Password"
					}),
					/* @__PURE__ */ jsx(TextInput_default, {
						type: "password",
						name: "password_confirmation",
						value: data.password_confirmation,
						className: "mt-1 block w-full",
						autoComplete: "new-password",
						onChange: (e) => setData("password_confirmation", e.target.value)
					}),
					/* @__PURE__ */ jsx(InputError, {
						message: errors.password_confirmation,
						className: "mt-2"
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-4 flex items-center justify-end",
				children: /* @__PURE__ */ jsx(PrimaryButton, {
					className: "ms-4",
					disabled: processing,
					children: "Reset Password"
				})
			})
		]
	})] });
}
//#endregion
//#region resources/js/Pages/Auth/VerifyEmail.tsx
var VerifyEmail_exports = /* @__PURE__ */ __exportAll({ default: () => VerifyEmail });
function VerifyEmail({ status }) {
	const { post, processing } = useForm({});
	const submit = (e) => {
		e.preventDefault();
		post(route("verification.send"));
	};
	return /* @__PURE__ */ jsxs(Guest, { children: [
		/* @__PURE__ */ jsx(Head, { title: "Email Verification" }),
		/* @__PURE__ */ jsx("div", {
			className: "mb-4 text-sm text-gray-600 dark:text-gray-400",
			children: "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another."
		}),
		status === "verification-link-sent" && /* @__PURE__ */ jsx("div", {
			className: "mb-4 text-sm font-medium text-green-600 dark:text-green-400",
			children: "A new verification link has been sent to the email address you provided during registration."
		}),
		/* @__PURE__ */ jsx("form", {
			onSubmit: submit,
			children: /* @__PURE__ */ jsxs("div", {
				className: "mt-4 flex items-center justify-between",
				children: [/* @__PURE__ */ jsx(PrimaryButton, {
					disabled: processing,
					children: "Resend Verification Email"
				}), /* @__PURE__ */ jsx(Link, {
					href: route("logout"),
					method: "post",
					as: "button",
					className: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800",
					children: "Log Out"
				})]
			})
		})
	] });
}
//#endregion
//#region resources/js/Layouts/PublicLayout.tsx
function PublicLayout({ children, title }) {
	const [menuOpen, setMenuOpen] = useState(false);
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-white text-[#1A1A2E]",
		children: [
			/* @__PURE__ */ jsx("nav", {
				className: "sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex justify-between items-center h-16",
						children: [
							/* @__PURE__ */ jsxs(Link, {
								href: "/",
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "w-8 h-8 bg-primary rounded-lg flex items-center justify-center",
										children: /* @__PURE__ */ jsx("svg", {
											width: "16",
											height: "16",
											viewBox: "0 0 16 16",
											fill: "none",
											children: /* @__PURE__ */ jsx("path", {
												d: "M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z",
												fill: "white"
											})
										})
									}),
									/* @__PURE__ */ jsx("span", {
										className: "font-semibold text-[#1A1A2E] text-lg text-left",
										children: "Kembangin"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-xs bg-navy-50 text-navy-600 px-2 py-0.5 rounded-full font-medium",
										children: "Academy"
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "hidden md:flex items-center gap-8",
								children: [
									/* @__PURE__ */ jsx(Link, {
										href: "/features",
										className: "text-sm text-slate-600 hover:text-[#1A1A2E] transition-colors",
										children: "Fitur"
									}),
									/* @__PURE__ */ jsx(Link, {
										href: "/how-it-works",
										className: "text-sm text-slate-600 hover:text-[#1A1A2E] transition-colors",
										children: "Cara Kerja"
									}),
									/* @__PURE__ */ jsx(Link, {
										href: "/blog",
										className: "text-sm text-slate-600 hover:text-[#1A1A2E] transition-colors",
										children: "Blog"
									}),
									/* @__PURE__ */ jsx(Link, {
										href: "/about",
										className: "text-sm text-slate-600 hover:text-[#1A1A2E] transition-colors",
										children: "Tentang"
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "hidden md:flex items-center gap-3",
								children: [
									/* @__PURE__ */ jsx(Link, {
										href: "/demo",
										className: "text-sm text-accent font-medium hover:text-primary transition-colors",
										children: "Coba Demo"
									}),
									/* @__PURE__ */ jsx(Link, {
										href: "/login",
										className: "text-sm text-slate-600 hover:text-[#1A1A2E] transition-colors",
										children: "Masuk"
									}),
									/* @__PURE__ */ jsx(Link, {
										href: "/register",
										className: "bg-primary text-white text-sm px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium",
										children: "Mulai Gratis"
									})
								]
							}),
							/* @__PURE__ */ jsx("button", {
								onClick: () => setMenuOpen(!menuOpen),
								className: "md:hidden p-2 text-slate-600",
								children: /* @__PURE__ */ jsx("svg", {
									width: "20",
									height: "20",
									fill: "none",
									viewBox: "0 0 24 24",
									stroke: "currentColor",
									children: menuOpen ? /* @__PURE__ */ jsx("path", {
										strokeLinecap: "round",
										strokeLinejoin: "round",
										strokeWidth: 2,
										d: "M6 18L18 6M6 6l12 12"
									}) : /* @__PURE__ */ jsx("path", {
										strokeLinecap: "round",
										strokeLinejoin: "round",
										strokeWidth: 2,
										d: "M4 6h16M4 12h16M4 18h16"
									})
								})
							})
						]
					}), menuOpen && /* @__PURE__ */ jsxs("div", {
						className: "md:hidden py-4 border-t border-slate-200 flex flex-col gap-3",
						children: [
							/* @__PURE__ */ jsx(Link, {
								href: "/features",
								className: "text-sm text-slate-600 py-1",
								children: "Fitur"
							}),
							/* @__PURE__ */ jsx(Link, {
								href: "/how-it-works",
								className: "text-sm text-slate-600 py-1",
								children: "Cara Kerja"
							}),
							/* @__PURE__ */ jsx(Link, {
								href: "/blog",
								className: "text-sm text-slate-600 py-1",
								children: "Blog"
							}),
							/* @__PURE__ */ jsx(Link, {
								href: "/about",
								className: "text-sm text-slate-600 py-1",
								children: "Tentang"
							}),
							/* @__PURE__ */ jsx(Link, {
								href: "/demo",
								className: "text-sm text-accent font-medium py-1",
								children: "Coba Demo"
							}),
							/* @__PURE__ */ jsx(Link, {
								href: "/register",
								className: "bg-primary text-white text-sm px-4 py-2 rounded-lg text-center font-medium mt-2",
								children: "Mulai Gratis"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ jsx("main", { children }),
			/* @__PURE__ */ jsx("footer", {
				className: "bg-primary text-white/70 py-12 mt-20",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 text-left",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "col-span-2 md:col-span-1",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 mb-3",
									children: [/* @__PURE__ */ jsx("div", {
										className: "w-7 h-7 bg-accent rounded-md flex items-center justify-center",
										children: /* @__PURE__ */ jsx("svg", {
											width: "14",
											height: "14",
											viewBox: "0 0 16 16",
											fill: "none",
											children: /* @__PURE__ */ jsx("path", {
												d: "M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z",
												fill: "white"
											})
										})
									}), /* @__PURE__ */ jsx("span", {
										className: "font-semibold text-white text-sm",
										children: "Kembangin"
									})]
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs leading-relaxed text-white/70",
									children: "Platform AI untuk bridging skill gap antara kurikulum kampus dan kebutuhan industri IT Indonesia."
								})]
							}),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-xs font-semibold text-white mb-3 uppercase tracking-wider",
								children: "Produk"
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-2",
								children: [
									/* @__PURE__ */ jsx(Link, {
										href: "/features",
										className: "text-xs hover:text-white transition-colors",
										children: "Fitur"
									}),
									/* @__PURE__ */ jsx(Link, {
										href: "/how-it-works",
										className: "text-xs hover:text-white transition-colors",
										children: "Cara Kerja"
									}),
									/* @__PURE__ */ jsx(Link, {
										href: "/demo",
										className: "text-xs hover:text-white transition-colors",
										children: "Demo Langsung"
									})
								]
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-xs font-semibold text-white mb-3 uppercase tracking-wider",
								children: "Sumber"
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-2",
								children: [
									/* @__PURE__ */ jsx(Link, {
										href: "/blog",
										className: "text-xs hover:text-white transition-colors",
										children: "Blog"
									}),
									/* @__PURE__ */ jsx(Link, {
										href: "/faq",
										className: "text-xs hover:text-white transition-colors",
										children: "FAQ"
									}),
									/* @__PURE__ */ jsx(Link, {
										href: "/about",
										className: "text-xs hover:text-white transition-colors",
										children: "Tentang Kami"
									})
								]
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-xs font-semibold text-white mb-3 uppercase tracking-wider",
								children: "Akun"
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-2",
								children: [/* @__PURE__ */ jsx(Link, {
									href: "/login",
									className: "text-xs hover:text-white transition-colors",
									children: "Masuk"
								}), /* @__PURE__ */ jsx(Link, {
									href: "/register",
									className: "text-xs hover:text-white transition-colors",
									children: "Daftar Gratis"
								})]
							})] })
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-xs",
							children: "© 2026 Kembangin. Dibuat untuk SDG 4 & SDG 8."
						}), /* @__PURE__ */ jsx("div", {
							className: "flex gap-4",
							children: /* @__PURE__ */ jsx(Link, {
								href: "https://github.com/kendikadimas/careersync",
								className: "text-xs hover:text-white transition-colors",
								children: "GitHub"
							})
						})]
					})]
				})
			})
		]
	});
}
//#endregion
//#region resources/js/Pages/Blog.tsx
var Blog_exports = /* @__PURE__ */ __exportAll({ default: () => Blog });
var colorMap = {
	teal: "bg-teal-50 text-teal-700",
	navy: "bg-slate-900 text-white",
	purple: "bg-purple-50 text-purple-700"
};
var bgMap$1 = {
	teal: "bg-teal-500",
	navy: "bg-slate-900",
	purple: "bg-purple-500"
};
function Blog({ posts }) {
	return /* @__PURE__ */ jsxs(PublicLayout, { children: [/* @__PURE__ */ jsx("section", {
		className: "pt-20 pb-12 px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-5xl mx-auto text-center",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-xs font-black text-teal-600 uppercase tracking-[0.2em] mb-4",
					children: "Insight & Resources"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight",
					children: "Insight Karir IT Indonesia"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-gray-500 text-lg leading-relaxed font-medium",
					children: "Panduan praktis, tren pasar kerja, dan roadmap belajar dari data nyata pasar Indonesia."
				})
			]
		})
	}), /* @__PURE__ */ jsx("section", {
		className: "pb-28 px-4",
		children: /* @__PURE__ */ jsx("div", {
			className: "max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-left",
			children: posts.map((post, i) => /* @__PURE__ */ jsx(motion.div, {
				initial: {
					opacity: 0,
					y: 16
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { delay: i * .1 },
				children: /* @__PURE__ */ jsxs(Link, {
					href: `/blog/${post.slug}`,
					className: "group flex flex-col h-full bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:border-teal-500 hover:shadow-2xl hover:shadow-teal-500/5 transition-all",
					children: [/* @__PURE__ */ jsxs("div", {
						className: `${bgMap$1[post.cover_color] || "bg-gray-200"} h-52 flex items-center justify-center relative overflow-hidden`,
						children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-size-[15px_15px]" }), /* @__PURE__ */ jsx("span", {
							className: "text-6xl group-hover:scale-125 transition-transform duration-700 select-none",
							children: post.cover_color === "teal" ? "📊" : post.cover_color === "navy" ? "🔎" : "🗺️"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "p-8 flex flex-col flex-1",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 mb-6",
								children: [/* @__PURE__ */ jsx("span", {
									className: `text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl ${colorMap[post.cover_color] || "bg-gray-100 text-gray-600"}`,
									children: post.category
								}), /* @__PURE__ */ jsxs("span", {
									className: "text-[10px] text-slate-400 font-black uppercase tracking-widest",
									children: [post.read_time, " Min Read"]
								})]
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "font-black text-gray-900 mb-4 text-xl leading-tight group-hover:text-teal-600 transition-colors tracking-tight",
								children: post.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-slate-500 leading-relaxed mb-8 line-clamp-3 font-medium",
								children: post.excerpt
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-auto pt-6 border-t border-slate-50 flex justify-between items-center text-[10px] text-slate-400 font-black uppercase tracking-widest",
								children: [/* @__PURE__ */ jsx("span", { children: post.published_at }), /* @__PURE__ */ jsx("span", {
									className: "group-hover:text-teal-600 transition-colors",
									children: "Baca Detail →"
								})]
							})
						]
					})]
				})
			}, post.slug))
		})
	})] });
}
//#endregion
//#region resources/js/Pages/BlogPost.tsx
var BlogPost_exports = /* @__PURE__ */ __exportAll({ default: () => BlogPost });
var bgMap = {
	teal: "bg-teal-500",
	navy: "bg-slate-900",
	purple: "bg-purple-500"
};
function BlogPost({ post, all_posts }) {
	const related = all_posts.filter((p) => post.related_slugs.includes(p.slug));
	return /* @__PURE__ */ jsxs(PublicLayout, { children: [/* @__PURE__ */ jsx(Head, { title: post.title }), /* @__PURE__ */ jsxs("article", {
		className: "pb-28",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: `${bgMap[post.cover_color]} pt-24 pb-40 text-white relative overflow-hidden text-center`,
				children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-size-[20px_20px]" }), /* @__PURE__ */ jsx("div", {
					className: "max-w-4xl mx-auto px-4 relative",
					children: /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "inline-block bg-white/20 backdrop-blur-xl px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-white/20",
								children: post.category
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "text-4xl md:text-6xl font-black mb-8 leading-tight text-balance tracking-tighter",
								children: post.title
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex justify-center items-center gap-6 text-[10px] font-black uppercase tracking-[0.1em] text-white/70",
								children: [
									/* @__PURE__ */ jsx("span", { children: post.published_at }),
									/* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-white/30 rounded-full" }),
									/* @__PURE__ */ jsxs("span", { children: [post.read_time, " Menit Baca"] })
								]
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "max-w-4xl mx-auto px-4 -mt-24 relative",
				children: /* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { delay: .2 },
					className: "bg-white rounded-[3rem] p-10 md:p-20 shadow-2xl shadow-slate-200/50 border border-slate-100 text-left",
					children: [post.content_sections.map((section, i) => /* @__PURE__ */ jsxs("div", {
						className: "mb-14 last:mb-0",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "text-2xl md:text-3xl font-black text-gray-900 mb-6 tracking-tight",
							children: section.heading
						}), /* @__PURE__ */ jsx("p", {
							className: "text-slate-600 leading-relaxed text-base md:text-lg font-medium whitespace-pre-wrap",
							children: section.body
						})]
					}, i)), /* @__PURE__ */ jsxs("div", {
						className: "mt-20 pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6",
						children: [/* @__PURE__ */ jsxs(Link, {
							href: "/blog",
							className: "text-teal-600 font-black text-xs uppercase tracking-widest hover:text-teal-700 transition-colors flex items-center gap-2 group",
							children: [/* @__PURE__ */ jsx("span", {
								className: "group-hover:-translate-x-1 transition-transform",
								children: "←"
							}), " Kembali ke List Blog"]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-[10px] font-black text-slate-400 uppercase tracking-widest pt-0.5",
								children: "Share:"
							}), [
								"T",
								"L",
								"F"
							].map((s) => /* @__PURE__ */ jsx("div", {
								className: "w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400 hover:bg-navy-900 hover:text-white transition-all cursor-pointer",
								children: s
							}, s))]
						})]
					})]
				})
			}),
			related.length > 0 && /* @__PURE__ */ jsxs("section", {
				className: "max-w-5xl mx-auto px-4 mt-32",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "text-center mb-12",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-[10px] font-black text-teal-600 uppercase tracking-[0.2em] mb-3",
						children: "Baca Juga"
					}), /* @__PURE__ */ jsx("h3", {
						className: "font-black text-gray-900 text-2xl tracking-tight",
						children: "Artikel Terkait"
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "grid md:grid-cols-2 gap-8 text-left",
					children: related.map((p) => /* @__PURE__ */ jsxs(Link, {
						href: `/blog/${p.slug}`,
						className: "bg-white border border-slate-100 rounded-[2rem] p-8 hover:border-teal-500 hover:shadow-xl hover:shadow-teal-500/5 transition-all flex items-center gap-6 group",
						children: [/* @__PURE__ */ jsx("div", {
							className: `w-16 h-16 rounded-2xl shrink-0 ${bgMap[p.cover_color]} flex items-center justify-center text-3xl shadow-lg shadow-black/5 group-hover:rotate-6 transition-transform`,
							children: p.cover_color === "teal" ? "📊" : p.cover_color === "navy" ? "🔎" : "🗺️"
						}), /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-[10px] font-black text-teal-600 uppercase tracking-widest mb-1",
								children: p.category
							}),
							/* @__PURE__ */ jsx("h4", {
								className: "font-black text-gray-900 text-base group-hover:text-teal-600 transition-colors line-clamp-1 tracking-tight",
								children: p.title
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2",
								children: [p.read_time, " Min Read"]
							})
						] })]
					}, p.slug))
				})]
			})
		]
	})] });
}
//#endregion
//#region resources/js/Pages/Capstone/Submit.tsx
var Submit_exports = /* @__PURE__ */ __exportAll({ default: () => Submit });
function Submit({ roadmap, milestone, submission, checklist_items }) {
	const { data, setData, post, processing, errors } = useForm({
		github_url: submission?.github_url || "",
		demo_url: submission?.demo_url || "",
		description: submission?.description || "",
		checklist_completed: submission?.checklist_completed || []
	});
	const [previewScore, setPreviewScore] = useState(0);
	const [githubVerification, setGithubVerification] = useState(null);
	const [verifying, setVerifying] = useState(false);
	const handleVerifyGithub = async () => {
		if (!data.github_url || !data.github_url.startsWith("https://github.com")) {
			setGithubVerification(null);
			return;
		}
		setVerifying(true);
		try {
			setGithubVerification(await (await fetch(`/capstone/verify-github?url=${encodeURIComponent(data.github_url)}`)).json());
		} catch (e) {
			console.error(e);
		}
		setVerifying(false);
	};
	const calculatePreviewScore = () => {
		let score = 0;
		if (githubVerification) {
			if (data.github_url && data.github_url.startsWith("https://github.com")) score += 20;
			if (githubVerification.has_readme) score += 20;
			if (githubVerification.has_commits) score += 10;
			if (githubVerification.file_count >= 3) score += 5;
		} else if (data.github_url && data.github_url.startsWith("https://github.com")) score += 20;
		if (data.demo_url) score += 10;
		if (data.description && data.description.length >= 50) score += 5;
		let selfScore = 0;
		const selfReportItems = ["uses_milestone_tech", "has_screenshot"];
		data.checklist_completed.forEach((key) => {
			if (selfReportItems.includes(key)) selfScore += 15;
			else selfScore += 10;
		});
		score += Math.min(30, selfScore);
		return Math.min(100, score);
	};
	useEffect(() => {
		setPreviewScore(calculatePreviewScore());
	}, [data, githubVerification]);
	const handleCheck = (key) => {
		if (data.checklist_completed.includes(key)) setData("checklist_completed", data.checklist_completed.filter((k) => k !== key));
		else setData("checklist_completed", [...data.checklist_completed, key]);
	};
	const submitForm = (e) => {
		e.preventDefault();
		post(route("capstone.submit", [roadmap.id, milestone.id]));
	};
	const isSubmittable = data.github_url && data.github_url.startsWith("https://github.com") && data.description.length >= 50;
	const getScoreColor = (score) => {
		if (score >= 80) return "bg-emerald-500 text-white";
		if (score >= 60) return "bg-teal-500 text-white";
		if (score >= 40) return "bg-amber-500 text-white";
		return "bg-rose-500 text-white";
	};
	const getScoreProgressBarColor = (score) => {
		if (score >= 80) return "bg-emerald-500";
		if (score >= 60) return "bg-teal-500";
		if (score >= 40) return "bg-amber-500";
		return "bg-rose-500";
	};
	return /* @__PURE__ */ jsxs(AppLayout, {
		header: "Submit Capstone Project",
		children: [/* @__PURE__ */ jsx(Head, { title: `Submit ${milestone.title} | Kembangin` }), /* @__PURE__ */ jsxs("div", {
			className: "max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8",
			children: [
				/* @__PURE__ */ jsxs(Link, {
					href: route("roadmap"),
					className: "inline-flex items-center text-sm font-semibold text-slate-500 hover:text-navy-900 mb-8 transition-colors",
					children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }), "Kembali ke Roadmap"]
				}),
				submission && submission.status === "completed" && /* @__PURE__ */ jsxs("div", {
					className: "mb-8 p-5 bg-emerald-50 border border-emerald-100 rounded-lg flex items-start gap-4",
					children: [/* @__PURE__ */ jsx("div", {
						className: "w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0",
						children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-6 h-6" })
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("h3", {
						className: "font-bold text-emerald-900",
						children: [
							"Project Selesai! (Score: ",
							submission.completion_score,
							"/100)"
						]
					}), /* @__PURE__ */ jsx("p", {
						className: "text-[13px] text-emerald-700 mt-1 font-medium",
						children: "Kamu sudah menyelesaikan project ini dengan baik. Milestone berikutnya sudah terbuka."
					})] })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "lg:col-span-2 space-y-8",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "mb-8",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3 mb-3",
									children: [/* @__PURE__ */ jsx("div", {
										className: "w-12 h-12 bg-white border border-slate-100 shadow-sm rounded-lg flex items-center justify-center text-3xl",
										children: milestone.emoji
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
										className: "text-2xl font-black text-slate-900 tracking-tight",
										children: milestone.title
									}), /* @__PURE__ */ jsx("p", {
										className: "text-[13px] font-bold text-indigo-500 uppercase tracking-widest",
										children: "Milestone Capstone"
									})] })]
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "bg-indigo-950 text-white rounded-lg p-8 relative overflow-hidden shadow-xl border border-indigo-900",
								children: [/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white/5 rounded-full blur-2xl" }), /* @__PURE__ */ jsxs("div", {
									className: "relative z-10",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2 text-indigo-400 mb-4",
											children: [/* @__PURE__ */ jsx(Target, { className: "w-5 h-5" }), /* @__PURE__ */ jsx("h3", {
												className: "font-black text-[11px] tracking-widest uppercase",
												children: "Project Brief"
											})]
										}),
										/* @__PURE__ */ jsx("h2", {
											className: "text-2xl font-black mb-4",
											children: milestone.capstone_project?.title || "Mini Project"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-indigo-100/70 text-sm leading-relaxed mb-8 max-w-2xl font-medium",
											children: milestone.capstone_project?.description || "Implementasikan apa yang sudah kamu pelajari di milestone ini."
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex flex-wrap gap-4 items-center",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ jsx(Code, { className: "w-4 h-4 text-indigo-400" }), /* @__PURE__ */ jsx("span", {
													className: "text-[12px] font-bold text-indigo-300 uppercase tracking-wider",
													children: "Stack:"
												})]
											}), /* @__PURE__ */ jsx("div", {
												className: "flex flex-wrap gap-2",
												children: milestone.skills?.map((tch) => /* @__PURE__ */ jsx("span", {
													className: "px-3 py-1 bg-white/10 text-white rounded-lg text-[11px] font-bold border border-white/5",
													children: tch
												}, tch))
											})]
										})
									]
								})]
							}),
							/* @__PURE__ */ jsxs("form", {
								onSubmit: submitForm,
								className: "space-y-8 bg-white p-6 sm:p-8 rounded-lg border border-slate-100 shadow-sm",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "space-y-6",
										children: [
											/* @__PURE__ */ jsxs("div", { children: [
												/* @__PURE__ */ jsxs("label", {
													htmlFor: "github_url",
													className: "flex items-center gap-2 text-[13px] font-bold text-slate-700 mb-2",
													children: [
														/* @__PURE__ */ jsx(Code, { className: "w-4 h-4 text-slate-400" }),
														"Repository GitHub ",
														/* @__PURE__ */ jsx("span", {
															className: "text-rose-500",
															children: "*"
														})
													]
												}),
												/* @__PURE__ */ jsxs("div", {
													className: "relative group",
													children: [/* @__PURE__ */ jsx("input", {
														type: "url",
														id: "github_url",
														value: data.github_url,
														onChange: (e) => setData("github_url", e.target.value),
														onBlur: handleVerifyGithub,
														className: "w-full pl-12 pr-5 py-4 rounded-lg border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-sm",
														placeholder: "https://github.com/username/project"
													}), /* @__PURE__ */ jsx("div", {
														className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors",
														children: /* @__PURE__ */ jsx(Code, { className: "w-5 h-5" })
													})]
												}),
												verifying && /* @__PURE__ */ jsxs("p", {
													className: "text-indigo-600 text-[11px] mt-2 font-bold flex items-center uppercase tracking-widest",
													children: [/* @__PURE__ */ jsx(Loader2, { className: "w-3 h-3 mr-1.5 animate-spin" }), " Menganalisis repository..."]
												}),
												errors.github_url && /* @__PURE__ */ jsx("p", {
													className: "text-rose-500 text-xs mt-2 font-bold",
													children: errors.github_url
												}),
												githubVerification && !verifying && /* @__PURE__ */ jsxs("div", {
													className: `mt-2 p-3 rounded-lg text-xs ${githubVerification.verified ? "bg-teal-50 border border-teal-200 text-teal-700" : "bg-amber-50 border border-amber-200 text-amber-700"}`,
													children: [
														/* @__PURE__ */ jsxs("div", {
															className: "font-bold mb-1 flex items-center gap-1",
															children: [githubVerification.verified ? /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3 h-3" }) : /* @__PURE__ */ jsx(AlertCircle, { className: "w-3 h-3" }), githubVerification.verified ? "Repository terverifikasi!" : "Repository belum terverifikasi"]
														}),
														/* @__PURE__ */ jsxs("div", {
															className: "space-y-0.5",
															children: [
																githubVerification.has_readme && /* @__PURE__ */ jsx("p", { children: "✓ README.md ditemukan" }),
																githubVerification.has_commits && /* @__PURE__ */ jsx("p", { children: "✓ Repository punya commits" }),
																githubVerification.file_count > 0 && /* @__PURE__ */ jsxs("p", { children: [
																	"✓ ",
																	githubVerification.file_count || 0,
																	" files ditemukan"
																] }),
																!githubVerification.verified && githubVerification.fail_reason && /* @__PURE__ */ jsxs("p", {
																	className: "text-rose-500 mt-1",
																	children: ["✗ ", githubVerification.fail_reason]
																})
															]
														}),
														githubVerification.verified && /* @__PURE__ */ jsxs("p", {
															className: "mt-2 font-semibold",
															children: [
																"+",
																githubVerification.verified_score,
																" verified points otomatis"
															]
														})
													]
												})
											] }),
											/* @__PURE__ */ jsxs("div", { children: [
												/* @__PURE__ */ jsxs("label", {
													htmlFor: "demo_url",
													className: "flex items-center gap-2 text-[13px] font-bold text-slate-700 mb-2",
													children: [
														/* @__PURE__ */ jsx(Link$1, { className: "w-4 h-4 text-slate-400" }),
														"Link Demo / Deploy ",
														/* @__PURE__ */ jsx("span", {
															className: "text-slate-400 font-normal ml-auto text-[11px]",
															children: "(Opsional)"
														})
													]
												}),
												/* @__PURE__ */ jsxs("div", {
													className: "relative group",
													children: [/* @__PURE__ */ jsx("input", {
														type: "url",
														id: "demo_url",
														value: data.demo_url,
														onChange: (e) => setData("demo_url", e.target.value),
														className: "w-full pl-12 pr-5 py-4 rounded-lg border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-sm",
														placeholder: "https://project.vercel.app"
													}), /* @__PURE__ */ jsx("div", {
														className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors",
														children: /* @__PURE__ */ jsx(Link$1, { className: "w-5 h-5" })
													})]
												}),
												/* @__PURE__ */ jsx("p", {
													className: "text-[11px] text-slate-400 mt-2 font-bold uppercase tracking-widest",
													children: "Deploy project kamu untuk mendapatkan +15 Poin!"
												}),
												errors.demo_url && /* @__PURE__ */ jsx("p", {
													className: "text-rose-500 text-xs mt-2 font-bold",
													children: errors.demo_url
												})
											] }),
											/* @__PURE__ */ jsxs("div", { children: [
												/* @__PURE__ */ jsxs("label", {
													htmlFor: "description",
													className: "flex items-center gap-2 text-[13px] font-bold text-slate-700 mb-2",
													children: [
														/* @__PURE__ */ jsx(Code, { className: "w-4 h-4 text-slate-400" }),
														"Deskripsi Project ",
														/* @__PURE__ */ jsx("span", {
															className: "text-rose-500",
															children: "*"
														})
													]
												}),
												/* @__PURE__ */ jsx("textarea", {
													id: "description",
													rows: 5,
													value: data.description,
													onChange: (e) => setData("description", e.target.value),
													className: "w-full px-5 py-4 rounded-lg border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-sm resize-none",
													placeholder: "Jelaskan fitur utama dan apa yang kamu bangun..."
												}),
												/* @__PURE__ */ jsxs("div", {
													className: "flex justify-between items-center mt-2",
													children: [errors.description ? /* @__PURE__ */ jsx("p", {
														className: "text-rose-500 text-[11px] font-bold",
														children: errors.description
													}) : /* @__PURE__ */ jsx("span", {}), /* @__PURE__ */ jsxs("span", {
														className: `text-[11px] font-black uppercase tracking-widest ${data.description.length < 50 ? "text-amber-500" : "text-emerald-500"}`,
														children: [data.description.length, " / 50 characters min"]
													})]
												})
											] })
										]
									}),
									/* @__PURE__ */ jsx("hr", { className: "border-slate-100" }),
									/* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsxs("div", {
											className: "mb-6",
											children: [/* @__PURE__ */ jsx("h3", {
												className: "text-lg font-black text-navy-900",
												children: "Checklist Evaluasi Mandiri"
											}), /* @__PURE__ */ jsx("p", {
												className: "text-sm text-slate-500 mt-1",
												children: "Centang kriteria yang sudah kamu penuhi. Kumpulkan poin sebanyak-banyaknya!"
											})]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "space-y-4",
											children: checklist_items?.map((item) => /* @__PURE__ */ jsxs("label", {
												className: `flex items-start gap-4 p-5 rounded-lg border transition-all cursor-pointer ${data.checklist_completed.includes(item.key) ? "bg-indigo-50/50 border-indigo-200 ring-4 ring-indigo-50/20" : "bg-slate-50/30 border-slate-100 hover:border-indigo-100 hover:bg-white hover:shadow-md"}`,
												children: [
													/* @__PURE__ */ jsx("div", {
														className: "flex items-center h-6 shrink-0 pt-0.5",
														children: /* @__PURE__ */ jsx("input", {
															type: "checkbox",
															checked: data.checklist_completed.includes(item.key),
															onChange: () => handleCheck(item.key),
															className: "w-5 h-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
														})
													}),
													/* @__PURE__ */ jsx("div", {
														className: "flex-1",
														children: /* @__PURE__ */ jsx("p", {
															className: `text-[14px] font-bold leading-relaxed ${data.checklist_completed.includes(item.key) ? "text-indigo-900" : "text-slate-600"}`,
															children: item.label
														})
													}),
													/* @__PURE__ */ jsx("div", {
														className: "shrink-0 pt-0.5",
														children: /* @__PURE__ */ jsxs("div", {
															className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-black text-[10px] uppercase tracking-widest ${data.checklist_completed.includes(item.key) ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-400"}`,
															children: [
																/* @__PURE__ */ jsx(Target, { className: "w-3 h-3" }),
																"+",
																item.points,
																" pts"
															]
														})
													})
												]
											}, item.key))
										}),
										errors.checklist_completed && /* @__PURE__ */ jsxs("p", {
											className: "text-rose-500 text-xs mt-4 font-bold flex items-center gap-1.5 uppercase tracking-widest",
											children: [
												/* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4" }),
												" ",
												errors.checklist_completed
											]
										})
									] }),
									/* @__PURE__ */ jsxs("button", {
										type: "submit",
										disabled: processing || !isSubmittable,
										className: "w-full flex items-center justify-center gap-3 px-8 py-5 bg-indigo-950 text-white rounded-lg font-black text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-900 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
										children: [processing ? /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 animate-spin" }) : /* @__PURE__ */ jsx(LayoutTemplate, { className: "w-5 h-5" }), submission ? "Perbarui Submission" : "Submit Project & Klaim Sertifikat"]
									})
								]
							})
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "lg:col-span-1",
						children: /* @__PURE__ */ jsxs("div", {
							className: "sticky top-8 bg-white rounded-lg p-8 border border-slate-100 shadow-sm",
							children: [
								/* @__PURE__ */ jsx("h3", {
									className: "font-black text-slate-900 mb-8 text-center uppercase tracking-widest text-xs",
									children: "Estimasi Score"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "flex flex-col items-center mb-10",
									children: /* @__PURE__ */ jsxs("div", {
										className: `w-36 h-36 rounded-full flex flex-col items-center justify-center shadow-inner relative overflow-hidden ${getScoreColor(previewScore)} transition-all duration-700 ring-8 ring-slate-50`,
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-5xl font-black tracking-tighter",
											children: previewScore
										}), /* @__PURE__ */ jsx("span", {
											className: "text-[10px] font-black uppercase tracking-[0.2em] opacity-60",
											children: "SCORE"
										})]
									})
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mb-4",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex justify-between text-xs font-bold text-slate-500 mb-2",
										children: [/* @__PURE__ */ jsx("span", { children: "Progress Poin" }), /* @__PURE__ */ jsx("span", { children: "Min. 60 untuk Lulus" })]
									}), /* @__PURE__ */ jsx("div", {
										className: "w-full bg-slate-100 h-3 rounded-full overflow-hidden",
										children: /* @__PURE__ */ jsx("div", {
											className: `h-full transition-all duration-700 ease-out ${getScoreProgressBarColor(previewScore)}`,
											style: { width: `${previewScore}%` }
										})
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-4 pt-6 border-t border-slate-100",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex justify-between items-center text-sm",
											children: [/* @__PURE__ */ jsxs("span", {
												className: "text-slate-500 font-medium flex items-center gap-2",
												children: [/* @__PURE__ */ jsx("div", { className: `w-2 h-2 rounded-full ${data.github_url.startsWith("https://github.com") ? "bg-teal-500" : "bg-slate-300"}` }), "GitHub URL"]
											}), /* @__PURE__ */ jsx("span", {
												className: "font-bold text-navy-900 border border-slate-100 px-2 rounded bg-slate-50",
												children: data.github_url.startsWith("https://github.com") ? "+20" : "0"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex justify-between items-center text-sm",
											children: [/* @__PURE__ */ jsxs("span", {
												className: "text-slate-500 font-medium flex items-center gap-2",
												children: [/* @__PURE__ */ jsx("div", { className: `w-2 h-2 rounded-full ${data.demo_url ? "bg-teal-500" : "bg-slate-300"}` }), "Demo URL"]
											}), /* @__PURE__ */ jsx("span", {
												className: "font-bold text-navy-900 border border-slate-100 px-2 rounded bg-slate-50",
												children: data.demo_url ? "+10" : "0"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex justify-between items-center text-sm",
											children: [/* @__PURE__ */ jsxs("span", {
												className: "text-slate-500 font-medium flex items-center gap-2",
												children: [/* @__PURE__ */ jsx("div", { className: `w-2 h-2 rounded-full ${data.description.length >= 50 ? "bg-teal-500" : "bg-slate-300"}` }), "Deskripsi"]
											}), /* @__PURE__ */ jsx("span", {
												className: "font-bold text-navy-900 border border-slate-100 px-2 rounded bg-slate-50",
												children: data.description.length >= 50 ? "+5" : "0"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex justify-between items-center text-sm",
											children: [/* @__PURE__ */ jsxs("span", {
												className: "text-slate-500 font-medium flex items-center gap-2",
												children: [/* @__PURE__ */ jsx("div", { className: `w-2 h-2 rounded-full ${data.checklist_completed.length > 0 ? "bg-teal-500" : "bg-slate-300"}` }), "Checklist User"]
											}), /* @__PURE__ */ jsxs("span", {
												className: "font-bold text-navy-900 border border-slate-100 px-2 rounded bg-slate-50",
												children: ["+", previewScore - ((data.github_url.startsWith("https://github.com") ? 20 : 0) + (data.demo_url ? 10 : 0) + (data.description.length >= 50 ? 5 : 0))]
											})]
										})
									]
								})
							]
						})
					})]
				})
			]
		})]
	});
}
//#endregion
//#region resources/js/Pages/Dashboard.tsx
var Dashboard_exports = /* @__PURE__ */ __exportAll({ default: () => Dashboard });
Array(12).fill(0);
function GaugeChart({ percent, dark = false }) {
	const r = 75;
	const cx = 100;
	const cy = 100;
	const startAngle = -210;
	const sweepAngle = 240;
	function polarToCart(angle) {
		const rad = angle * Math.PI / 180;
		return {
			x: cx + r * Math.cos(rad),
			y: cy + r * Math.sin(rad)
		};
	}
	function describeArc(startDeg, endDeg) {
		const s = polarToCart(startDeg);
		const e = polarToCart(endDeg);
		const large = endDeg - startDeg > 180 ? 1 : 0;
		return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
	}
	const fillEnd = startAngle + sweepAngle * percent / 100;
	return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 200 150",
		className: "w-full max-w-[220px] mx-auto",
		children: [
			/* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", {
				id: "gaugeGrad",
				x1: "0%",
				y1: "0%",
				x2: "100%",
				y2: "0%",
				children: [/* @__PURE__ */ jsx("stop", {
					offset: "0%",
					stopColor: "#4F46E5"
				}), /* @__PURE__ */ jsx("stop", {
					offset: "100%",
					stopColor: "#818CF8"
				})]
			}) }),
			/* @__PURE__ */ jsx("path", {
				d: describeArc(startAngle, startAngle + sweepAngle),
				fill: "none",
				stroke: "#F1F5F9",
				strokeWidth: "12",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: describeArc(startAngle, fillEnd),
				fill: "none",
				stroke: "url(#gaugeGrad)",
				strokeWidth: "12",
				strokeLinecap: "round",
				strokeDasharray: "0"
			}),
			/* @__PURE__ */ jsxs("text", {
				x: "100",
				y: "105",
				textAnchor: "middle",
				className: `text-3xl font-black ${dark ? "fill-white" : "fill-slate-800"}`,
				style: { fontFamily: "Geist, sans-serif" },
				children: [percent, "%"]
			}),
			/* @__PURE__ */ jsx("text", {
				x: "100",
				y: "130",
				textAnchor: "middle",
				className: `text-[10px] font-bold ${dark ? "fill-indigo-200" : "fill-slate-400"}`,
				children: "Readiness"
			})
		]
	});
}
function GrowthChart({ data, labels }) {
	const w = 440;
	const h = 180;
	const padX = 20;
	const padY = 30;
	const dataMax = Math.max(...data);
	const minVal = 0;
	const maxVal = Math.min(100, dataMax + (dataMax < 20 ? 10 : dataMax * .2));
	const [activeIndex, setActiveIndex] = useState(null);
	const pts = data.map((v, i) => ({
		x: padX + i / (data.length - 1 || 1) * (w - padX * 2),
		y: h - padY - (v - minVal) / (maxVal - minVal) * (h - padY * 2)
	}));
	const linePath = pts.reduce((acc, p, i, a) => {
		if (i === 0) return `M ${p.x} ${p.y}`;
		const prev = a[i - 1];
		const cp1x = prev.x + (p.x - prev.x) / 2;
		const cp2x = prev.x + (p.x - prev.x) / 2;
		return `${acc} C ${cp1x} ${prev.y}, ${cp2x} ${p.y}, ${p.x} ${p.y}`;
	}, "");
	const areaPath = `${linePath} L ${pts[pts.length - 1].x} ${h - padY} L ${pts[0].x} ${h - padY} Z`;
	const handleMove = (event) => {
		const rect = event.currentTarget.getBoundingClientRect();
		const ratio = Math.min(Math.max(event.clientX - rect.left, 0), rect.width) / rect.width;
		const idx = Math.round(ratio * (data.length - 1));
		setActiveIndex(Math.min(Math.max(idx, 0), data.length - 1));
	};
	return /* @__PURE__ */ jsxs("svg", {
		viewBox: `0 0 ${w} ${h}`,
		className: "w-full h-auto overflow-visible",
		onMouseMove: handleMove,
		onMouseLeave: () => setActiveIndex(null),
		children: [
			/* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", {
				id: "chartGrad",
				x1: "0",
				y1: "0",
				x2: "0",
				y2: "1",
				children: [/* @__PURE__ */ jsx("stop", {
					offset: "0%",
					stopColor: "#4F46E5",
					stopOpacity: "0.2"
				}), /* @__PURE__ */ jsx("stop", {
					offset: "100%",
					stopColor: "#4F46E5",
					stopOpacity: "0"
				})]
			}) }),
			[
				0,
				.5,
				1
			].map((f) => {
				const y = h - padY - f * (h - padY * 2);
				return /* @__PURE__ */ jsx("line", {
					x1: padX,
					y1: y,
					x2: w - padX,
					y2: y,
					stroke: "#F1F5F9",
					strokeWidth: "1"
				}, f);
			}),
			/* @__PURE__ */ jsx("path", {
				d: areaPath,
				fill: "url(#chartGrad)"
			}),
			/* @__PURE__ */ jsx("path", {
				d: linePath,
				fill: "none",
				stroke: "#4F46E5",
				strokeWidth: "3",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			activeIndex !== null && /* @__PURE__ */ jsxs("g", { children: [
				/* @__PURE__ */ jsx("line", {
					x1: pts[activeIndex].x,
					y1: padY,
					x2: pts[activeIndex].x,
					y2: h - padY,
					stroke: "#4F46E5",
					strokeWidth: "1",
					strokeDasharray: "4 4"
				}),
				/* @__PURE__ */ jsx("rect", {
					x: pts[activeIndex].x - 18,
					y: pts[activeIndex].y - 32,
					width: "36",
					height: "20",
					rx: "6",
					fill: "#1e293b"
				}),
				/* @__PURE__ */ jsx("text", {
					x: pts[activeIndex].x,
					y: pts[activeIndex].y - 18,
					textAnchor: "middle",
					className: "text-[11px] font-black fill-white",
					children: data[activeIndex]
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: pts[activeIndex].x,
					cy: pts[activeIndex].y,
					r: "6",
					fill: "#4F46E5",
					stroke: "white",
					strokeWidth: "2"
				})
			] }),
			labels.map((m, i) => {
				if (!(i === 0 || i === data.length - 1 || data.length > 5 && i % Math.ceil(data.length / 4) === 0)) return null;
				return /* @__PURE__ */ jsx("text", {
					x: padX + i / (data.length - 1 || 1) * (w - padX * 2),
					y: h - 5,
					textAnchor: i === 0 ? "start" : i === data.length - 1 ? "end" : "middle",
					className: "text-[9px] font-bold fill-slate-400",
					children: m
				}, i);
			})
		]
	});
}
function TrendingSkillsChart({ data }) {
	const chartData = [...data].sort((a, b) => (b.change || 0) - (a.change || 0)).slice(0, 5).map((s, i) => ({
		rank: i + 1,
		name: s.skill || s.name,
		growth: s.change || 0,
		full: 100
	}));
	const maxGrowth = Math.max(...chartData.map((d) => d.growth), 10);
	return /* @__PURE__ */ jsx("div", {
		className: "h-[280px] w-full",
		children: /* @__PURE__ */ jsx(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ jsxs(BarChart, {
				layout: "vertical",
				data: chartData,
				margin: {
					top: 5,
					right: 30,
					left: 10,
					bottom: 5
				},
				barSize: 12,
				children: [
					/* @__PURE__ */ jsx(CartesianGrid, {
						strokeDasharray: "3 3",
						horizontal: false,
						stroke: "#f1f5f9"
					}),
					/* @__PURE__ */ jsx(XAxis, {
						type: "number",
						hide: true,
						domain: [0, maxGrowth + 2]
					}),
					/* @__PURE__ */ jsx(YAxis, {
						dataKey: "name",
						type: "category",
						axisLine: false,
						tickLine: false,
						width: 100,
						tick: {
							fill: "#64748b",
							fontSize: 12,
							fontWeight: 600
						}
					}),
					/* @__PURE__ */ jsx(Tooltip, {
						cursor: { fill: "#f8fafc" },
						content: ({ active, payload }) => {
							if (active && payload && payload.length) return /* @__PURE__ */ jsxs("div", {
								className: "bg-white p-3 rounded-lg shadow-xl border border-slate-100",
								children: [
									/* @__PURE__ */ jsxs("p", {
										className: "text-[10px] font-bold text-slate-400 mb-1",
										children: ["Rank #", payload[0].payload.rank]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-sm font-black text-slate-900 mb-1",
										children: payload[0].payload.name
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "text-sm font-black text-indigo-600",
										children: [
											"+",
											payload[0].value,
											"% Growth"
										]
									})
								]
							});
							return null;
						}
					}),
					/* @__PURE__ */ jsx(Bar, {
						dataKey: "growth",
						radius: [
							0,
							10,
							10,
							0
						],
						fill: "#4F46E5",
						background: {
							fill: "#f1f5f9",
							radius: 10
						},
						animationBegin: 200,
						animationDuration: 1200,
						children: /* @__PURE__ */ jsx(LabelList, {
							dataKey: "growth",
							position: "right",
							formatter: (val) => `+${val}%`,
							style: {
								fill: "#6366f1",
								fontSize: 11,
								fontWeight: 900
							}
						})
					})
				]
			})
		})
	});
}
function Dashboard({ user, badges = [], profile, score, scoreHistory = [], trendingSkills = [], recommendedJobs = [], gapCount, skillStats, roadmap, roadmapStats, scoreMeta }) {
	const historyScores = scoreHistory.map((s) => Number(s.score)).filter((v) => Number.isFinite(v));
	const historyLabels = scoreHistory.map((s) => s.label);
	const workReadinessScore = score?.score ?? historyScores[historyScores.length - 1] ?? 0;
	const skillCount = profile?.skills?.length ?? 0;
	const skillGap = gapCount ?? 0;
	const milestoneReached = roadmapStats?.completed ?? roadmap?.milestones_completed ?? 0;
	roadmapStats?.remaining ?? Math.max((roadmap?.total_milestones ?? 0) - (roadmap?.milestones_completed ?? 0), 0);
	roadmapStats?.total ?? roadmap?.total_milestones;
	const processedScores = historyScores.length > 0 && historyScores[0] !== 0 ? [0, ...historyScores] : historyScores.length > 0 ? historyScores : [0];
	const processedLabels = historyScores.length > 0 && historyScores[0] !== 0 ? ["Mulai", ...historyLabels] : historyLabels.length > 0 ? historyLabels : ["-"];
	const growthData = processedScores.length >= 2 ? processedScores : Array(5).fill(processedScores[0]);
	const growthLabels = processedLabels.length >= 2 ? processedLabels : Array(5).fill(processedLabels[0]);
	const careerTarget = Array.isArray(profile?.career_target) ? profile.career_target[0] || "Unset" : profile?.career_target || "Unset";
	const hardSkills = (profile?.skills || []).filter((skill) => {
		const name = (typeof skill === "object" ? skill.name : skill).toLowerCase();
		return ![
			"communication",
			"leadership",
			"teamwork",
			"public speaking",
			"problem solving",
			"time management",
			"analytical thinking",
			"presentation"
		].some((s) => name.includes(s));
	});
	const softSkills = (profile?.skills || []).filter((skill) => {
		const name = (typeof skill === "object" ? skill.name : skill).toLowerCase();
		return [
			"communication",
			"leadership",
			"teamwork",
			"public speaking",
			"problem solving",
			"time management",
			"analytical thinking",
			"presentation"
		].some((s) => name.includes(s));
	});
	const hardScrollRef = useRef(null);
	const softScrollRef = useRef(null);
	const scroll = (ref, direction) => {
		if (ref.current) {
			const scrollAmount = 200;
			ref.current.scrollBy({
				left: direction === "left" ? -scrollAmount : scrollAmount,
				behavior: "smooth"
			});
		}
	};
	return /* @__PURE__ */ jsxs(AppLayout, { children: [/* @__PURE__ */ jsx(Head, { title: "Dashboard | Kembangin" }), /* @__PURE__ */ jsxs("div", {
		className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("h1", {
					className: "text-2xl font-black text-slate-900 tracking-tight",
					children: [
						"Selamat Datang, ",
						user.name,
						"!"
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3 mt-1",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-slate-500 text-sm",
						children: "Pantau perkembangan karirmu dan raih target kerjamu hari ini."
					}), /* @__PURE__ */ jsxs(Link, {
						href: route("profile.public", user.rank === "admin" ? 1 : user.id),
						className: "flex items-center gap-1.5 text-[11px] font-black text-indigo-600 hover:text-indigo-700 transition-colors bg-indigo-50 px-2.5 py-1 rounded-lg",
						children: [/* @__PURE__ */ jsx(Eye, { className: "w-3 h-3" }), "Lihat Profil Publik"]
					})]
				})] }), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3 bg-white p-2 pr-4 rounded-lg shadow-sm border border-slate-100",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "w-10 h-10 rounded-lg bg-indigo-900 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200",
							children: user.rank.charAt(0)
						}),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "text-[10px] font-bold text-slate-400",
							children: "Rank"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm font-bold text-slate-800",
							children: user.rank
						})] }),
						/* @__PURE__ */ jsx("div", { className: "h-8 w-px bg-slate-100 mx-2" }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "text-[10px] font-bold text-slate-400",
							children: "Points"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm font-black text-indigo-900",
							children: user.points.toLocaleString()
						})] })
					]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-4 bg-white rounded-lg p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center h-full",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "w-full flex items-center justify-between mb-6",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "text-lg font-black text-slate-900",
								children: "Work Readiness"
							}), /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 bg-indigo-50 px-2 py-1 rounded-lg" })]
						}),
						/* @__PURE__ */ jsx(GaugeChart, { percent: workReadinessScore }),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-6 flex flex-col items-center w-full",
							children: [/* @__PURE__ */ jsx("div", {
								className: "flex flex-col items-center gap-1 mb-4",
								children: /* @__PURE__ */ jsx("span", {
									className: `inline-block px-4 py-1.5 rounded-lg text-[11px] font-black ${workReadinessScore >= 80 ? "bg-emerald-100 text-emerald-700" : workReadinessScore >= 60 ? "bg-indigo-100 text-indigo-700" : workReadinessScore >= 40 ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"}`,
									children: workReadinessScore >= 80 ? "Industry Ready" : workReadinessScore >= 60 ? "Competent" : workReadinessScore >= 40 ? "Developing" : "Apprentice"
								})
							}), scoreMeta?.isStale && /* @__PURE__ */ jsx("p", {
								className: "text-[10px] text-amber-500 font-black italic mt-4 animate-pulse text-center",
								children: "Progress terbaru terdeteksi. Update skor?"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-2 gap-3 w-full mt-8",
							children: [/* @__PURE__ */ jsx(Link, {
								href: route("analysis"),
								className: "bg-slate-900 text-white text-xs font-bold py-3 rounded-lg hover:bg-slate-800 transition-all shadow-md active:scale-95 text-center",
								children: "Re-Analyze"
							}), /* @__PURE__ */ jsx(Link, {
								href: route("score.calculate"),
								method: "post",
								as: "button",
								className: "bg-white text-slate-600 text-xs font-bold py-3 rounded-lg hover:bg-slate-50 transition-all border border-slate-200 active:scale-95",
								children: "Refresh"
							})]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-8 flex flex-col gap-6 h-full",
					children: [/* @__PURE__ */ jsx("div", {
						className: "bg-indigo-900 rounded-lg py-8 px-10 text-white relative overflow-hidden shadow-xl shadow-indigo-100 flex-1 flex flex-col justify-end min-h-[180px]",
						children: /* @__PURE__ */ jsxs("div", {
							className: "relative z-10 flex flex-col h-full",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex justify-between items-start",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-white text-[14px] font-normal mb-2",
									children: "Target Karir Utama"
								}), /* @__PURE__ */ jsx(Link, {
									href: route("profile.edit"),
									className: "p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white",
									title: "Edit Target",
									children: /* @__PURE__ */ jsxs("svg", {
										width: "18",
										height: "18",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2.5",
										strokeLinecap: "round",
										strokeLinejoin: "round",
										children: [/* @__PURE__ */ jsx("line", {
											x1: "7",
											y1: "17",
											x2: "17",
											y2: "7"
										}), /* @__PURE__ */ jsx("polyline", { points: "7 7 17 7 17 17" })]
									})
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "mt-auto",
								children: [/* @__PURE__ */ jsx("h2", {
									className: "text-3xl font-black tracking-tight mb-4",
									children: careerTarget
								}), /* @__PURE__ */ jsx("div", {
									className: "flex items-center gap-3 mt-2",
									children: /* @__PURE__ */ jsxs("div", {
										className: "bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex gap-1",
											children: [Array.from({ length: Math.min(skillStats?.total || 0, 5) }).map((_, i) => /* @__PURE__ */ jsx("div", { className: `w-2 h-2 rounded-lg ${i < (skillStats?.mastered || 0) ? "bg-emerald-400" : "bg-white/30"}` }, i)), (skillStats?.total || 0) > 5 && /* @__PURE__ */ jsx("span", {
												className: "text-[8px] text-white/50",
												children: "..."
											})]
										}), /* @__PURE__ */ jsxs("span", {
											className: "text-[13px] font-bold text-white",
											children: [
												skillStats?.mastered || 0,
												" dari ",
												skillStats?.total || 0,
												" skill dikuasai"
											]
										})]
									})
								})]
							})]
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1 min-h-[180px]",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "bg-white rounded-lg p-6 border border-slate-100 shadow-sm flex flex-col justify-between h-full relative overflow-hidden group",
								children: [/* @__PURE__ */ jsx("div", {
									className: "relative z-10",
									children: /* @__PURE__ */ jsx("p", {
										className: "text-black text-[18px] font-bold ",
										children: "Total Skills"
									})
								}), /* @__PURE__ */ jsxs("div", {
									className: "relative z-10 mt-auto",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-5xl font-black text-slate-900 tracking-tighter",
										children: skillCount
									}), /* @__PURE__ */ jsx("p", {
										className: "text-[10px] font-bold text-black mt-1 italic",
										children: "Terdata di sistem"
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "bg-white rounded-lg p-6 border border-slate-100 shadow-sm flex flex-col justify-between h-full relative overflow-hidden group",
								children: [/* @__PURE__ */ jsx("div", {
									className: "relative z-10",
									children: /* @__PURE__ */ jsx("p", {
										className: "text-black text-[18px] font-bold ",
										children: "Skill Gap"
									})
								}), /* @__PURE__ */ jsxs("div", {
									className: "relative z-10 mt-auto",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-5xl font-black text-slate-900 tracking-tighter",
										children: skillGap
									}), /* @__PURE__ */ jsx("p", {
										className: "text-[10px] font-bold text-black mt-1 italic",
										children: "Perlu dipelajari"
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "bg-white rounded-lg p-6 border border-slate-100 shadow-sm flex flex-col justify-between text-white overflow-hidden relative h-full group",
								children: [/* @__PURE__ */ jsx("div", {
									className: "relative z-10",
									children: /* @__PURE__ */ jsx("p", {
										className: "text-black text-[18px] font-bold ",
										children: "Milestones"
									})
								}), /* @__PURE__ */ jsxs("div", {
									className: "relative z-10 mt-auto",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-5xl font-black text-slate-900 tracking-tighter",
										children: milestoneReached
									}), /* @__PURE__ */ jsx("p", {
										className: "text-[10px] font-bold text-black mt-1 italic",
										children: "Telah dicapai"
									})]
								})]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-8 bg-white rounded-lg p-8 shadow-sm border border-slate-100",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between mb-8",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-lg font-bold text-slate-900",
							children: "Perkembangan Skor"
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded-lg bg-indigo-500" }), /* @__PURE__ */ jsx("span", {
								className: "text-[11px] font-bold text-slate-500",
								children: "Daily Progress"
							})]
						})]
					}), /* @__PURE__ */ jsx(GrowthChart, {
						data: growthData,
						labels: growthLabels
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-4 bg-white rounded-lg p-8 shadow-sm border border-slate-100 flex flex-col h-full justify-between overflow-hidden",
					children: [/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("h3", {
							className: "text-xl font-black text-slate-900 mb-8 tracking-tight",
							children: "Skill Dikuasai"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mb-10",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between mb-4 px-1",
								children: [/* @__PURE__ */ jsx("h4", {
									className: "text-[14px] font-[600] text-slate-800",
									children: "Hard Skill"
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex gap-1.5",
									children: [/* @__PURE__ */ jsx("button", {
										onClick: () => scroll(hardScrollRef, "left"),
										className: "p-1 rounded-lg bg-slate-50 text-slate-400 hover:bg-indigo-900 hover:text-white transition-all",
										children: /* @__PURE__ */ jsx("svg", {
											width: "14",
											height: "14",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "3",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											children: /* @__PURE__ */ jsx("polyline", { points: "15 18 9 12 15 6" })
										})
									}), /* @__PURE__ */ jsx("button", {
										onClick: () => scroll(hardScrollRef, "right"),
										className: "p-1 rounded-lg bg-slate-50 text-slate-400 hover:bg-indigo-900 hover:text-white transition-all",
										children: /* @__PURE__ */ jsx("svg", {
											width: "14",
											height: "14",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "3",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											children: /* @__PURE__ */ jsx("polyline", { points: "9 18 15 12 9 6" })
										})
									})]
								})]
							}), /* @__PURE__ */ jsx("div", {
								ref: hardScrollRef,
								className: "flex gap-2 overflow-x-auto custom-scrollbar-hide snap-x pb-2",
								children: hardSkills.length > 0 ? hardSkills.map((skill, i) => /* @__PURE__ */ jsx("div", {
									className: "snap-start shrink-0 px-4 py-2.5 bg-indigo-950 border border-white/10 text-[13px] font-bold text-white rounded-lg hover:bg-indigo-900 transition-all shadow-sm",
									children: typeof skill === "object" ? skill.name : skill
								}, i)) : /* @__PURE__ */ jsx("p", {
									className: "text-xs text-slate-400 italic px-1",
									children: "Belum ada hard skill terdeteksi."
								})
							})]
						}),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between mb-4 px-1",
							children: [/* @__PURE__ */ jsx("h4", {
								className: "text-[14px] font-[600] text-slate-700",
								children: "Soft Skill"
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex gap-1.5",
								children: [/* @__PURE__ */ jsx("button", {
									onClick: () => scroll(softScrollRef, "left"),
									className: "p-1 rounded-lg bg-slate-50 text-slate-400 hover:bg-indigo-900 hover:text-white transition-all",
									children: /* @__PURE__ */ jsx("svg", {
										width: "14",
										height: "14",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "3",
										strokeLinecap: "round",
										strokeLinejoin: "round",
										children: /* @__PURE__ */ jsx("polyline", { points: "15 18 9 12 15 6" })
									})
								}), /* @__PURE__ */ jsx("button", {
									onClick: () => scroll(softScrollRef, "right"),
									className: "p-1 rounded-lg bg-slate-50 text-slate-400 hover:bg-indigo-900 hover:text-white transition-all",
									children: /* @__PURE__ */ jsx("svg", {
										width: "14",
										height: "14",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "3",
										strokeLinecap: "round",
										strokeLinejoin: "round",
										children: /* @__PURE__ */ jsx("polyline", { points: "9 18 15 12 9 6" })
									})
								})]
							})]
						}), /* @__PURE__ */ jsx("div", {
							ref: softScrollRef,
							className: "flex gap-2 overflow-x-auto custom-scrollbar-hide snap-x pb-2",
							children: softSkills.length > 0 ? softSkills.map((skill, i) => /* @__PURE__ */ jsx("div", {
								className: "snap-start shrink-0 px-4 py-2.5 bg-indigo-900 border border-white/5 text-[13px] font-bold text-white rounded-lg hover:bg-indigo-800 transition-all shadow-sm",
								children: typeof skill === "object" ? skill.name : skill
							}, i)) : /* @__PURE__ */ jsx("p", {
								className: "text-xs text-slate-400 italic px-1",
								children: "Belum ada soft skill terdeteksi."
							})
						})] })
					] }), /* @__PURE__ */ jsx("div", { className: "mt-8 pt-4 border-t border-slate-50" })]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-7 space-y-6",
					children: [/* @__PURE__ */ jsx("div", {
						className: "flex items-center justify-between px-2 mb-2",
						children: /* @__PURE__ */ jsx("h3", {
							className: "text-lg font-bold text-slate-900",
							children: "Peluang Karir Untukmu"
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-4",
						children: [recommendedJobs.slice(0, 4).map((job, i) => /* @__PURE__ */ jsxs("div", {
							className: "group bg-white p-5 rounded-lg border border-slate-100 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer flex items-center gap-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ jsx("h4", {
									className: "text-[15px] font-bold text-slate-900 truncate",
									children: job.title
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 mt-0.5",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "text-[11px] font-bold text-slate-400 tracking-tight",
											children: job.company
										}),
										/* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-lg bg-slate-200" }),
										/* @__PURE__ */ jsxs("span", {
											className: "text-[11px] font-bold text-indigo-900",
											children: [
												"IDR ",
												(job.salary_min / 1e6).toFixed(0),
												"JT+"
											]
										})
									]
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "shrink-0 text-right",
								children: /* @__PURE__ */ jsxs("div", {
									className: "text-[11px] font-black text-emerald-600  px-3 py-1 rounded-lg",
									children: [job.match, "% Match"]
								})
							})]
						}, i)), recommendedJobs.length === 0 && /* @__PURE__ */ jsx("div", {
							className: "p-12 text-center border-2 border-dashed border-slate-100 rounded-lg text-slate-400 text-sm",
							children: "Belum ada rekomendasi pekerjaan."
						})]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-5 bg-white rounded-lg p-8 shadow-sm border border-slate-100 flex flex-col",
					children: [/* @__PURE__ */ jsx("div", {
						className: "flex items-center justify-between mb-4",
						children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
							className: "text-xl font-black text-slate-900 tracking-tight",
							children: "Trending Skills"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-[10px] font-bold text-slate-400 mt-1",
							children: "Kenaikan demand dibanding bulan lalu"
						})] })
					}), /* @__PURE__ */ jsx("div", {
						className: "flex flex-col",
						children: /* @__PURE__ */ jsx("div", {
							className: "space-y-2",
							children: /* @__PURE__ */ jsx(TrendingSkillsChart, { data: [...trendingSkills].sort((a, b) => (b.change || 0) - (a.change || 0)) })
						})
					})]
				})]
			})
		]
	})] });
}
//#endregion
//#region resources/js/Pages/DashboardFaq.tsx
var DashboardFaq_exports = /* @__PURE__ */ __exportAll({ default: () => DashboardFaq });
function FaqItem$1({ faq, index }) {
	const [open, setOpen] = useState(false);
	return /* @__PURE__ */ jsxs(motion.div, {
		initial: {
			opacity: 0,
			y: 10
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: { delay: index * .05 },
		className: "border border-slate-100 rounded-2xl overflow-hidden bg-white hover:border-blue-100 transition-colors",
		children: [/* @__PURE__ */ jsxs("button", {
			onClick: () => setOpen(!open),
			className: "w-full flex justify-between items-center px-8 py-6 text-left hover:bg-slate-50/50 transition-colors group",
			children: [/* @__PURE__ */ jsx("span", {
				className: "font-black text-gray-900 text-sm pr-6 group-hover:text-[#2563EB] transition-colors uppercase tracking-tight",
				children: faq.q
			}), /* @__PURE__ */ jsx("span", {
				className: `text-slate-300 transition-transform duration-500 flex-shrink-0 ${open ? "rotate-180 text-[#2563EB]" : ""}`,
				children: /* @__PURE__ */ jsx("svg", {
					width: "24",
					height: "24",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "3",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					children: /* @__PURE__ */ jsx("path", { d: "M6 9l6 6 6-6" })
				})
			})]
		}), /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(motion.div, {
			initial: {
				height: 0,
				opacity: 0
			},
			animate: {
				height: "auto",
				opacity: 1
			},
			exit: {
				height: 0,
				opacity: 0
			},
			transition: {
				duration: .4,
				ease: [
					.04,
					.62,
					.23,
					.98
				]
			},
			className: "overflow-hidden",
			children: /* @__PURE__ */ jsx("div", {
				className: "px-8 pb-8 text-sm text-slate-500 leading-relaxed border-t border-slate-50 pt-6 bg-slate-50/20 font-medium",
				children: faq.a
			})
		}) })]
	});
}
function DashboardFaq({ faqs }) {
	return /* @__PURE__ */ jsx(AppLayout, {
		header: "FAQ",
		children: /* @__PURE__ */ jsxs("div", {
			className: "pt-4 pb-12 px-4",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "max-w-3xl mx-auto text-center mb-10",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-xs font-black text-[#2563EB] uppercase tracking-[0.2em] mb-3",
						children: "Pusat Bantuan"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "text-3xl font-black text-gray-900 mb-4 leading-tight",
						children: "Pertanyaan yang Sering Ditanyakan"
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "text-gray-500 text-sm leading-relaxed font-medium",
						children: ["Tidak menemukan jawaban yang kamu cari? ", /* @__PURE__ */ jsx("a", {
							href: "mailto:hello@kembangin.id",
							className: "text-[#2563EB] font-black underline decoration-2 underline-offset-4",
							children: "Hubungi tim kami"
						})]
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "max-w-3xl mx-auto space-y-4",
				children: faqs.map((faq, i) => /* @__PURE__ */ jsx(FaqItem$1, {
					faq,
					index: i
				}, i))
			})]
		})
	});
}
//#endregion
//#region resources/js/Pages/Demo.tsx
var Demo_exports = /* @__PURE__ */ __exportAll({ default: () => Demo });
function Demo({ profile, skill_gap, roadmap, work_readiness, recommended_jobs }) {
	const [activeTab, setActiveTab] = useState("dashboard");
	const chartData = useMemo(() => {
		return skill_gap.map((item) => ({
			subject: item.skill,
			demand: item.market_demand,
			score: item.user_score,
			fullMark: 100
		}));
	}, [skill_gap]);
	const initialNodes = useMemo(() => {
		return roadmap.milestones.map((ms, index) => ({
			id: ms.id,
			data: { label: ms.title },
			position: {
				x: index * 250,
				y: 150
			},
			style: {
				background: ms.status === "completed" ? "#0d9488" : ms.status === "current" ? "#f59e0b" : "#334155",
				color: "#fff",
				borderRadius: "1.25rem",
				padding: "12px",
				width: 190,
				fontSize: "11px",
				fontWeight: "900",
				textTransform: "uppercase",
				letterSpacing: "0.05em",
				border: "none",
				textAlign: "center",
				boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)"
			}
		}));
	}, [roadmap]);
	const initialEdges = useMemo(() => {
		return roadmap.milestones.slice(0, -1).map((ms, i) => ({
			id: `e${i}`,
			source: ms.id,
			target: roadmap.milestones[i + 1].id,
			animated: roadmap.milestones[i].status === "completed" && roadmap.milestones[i + 1].status === "current",
			style: {
				stroke: "#cbd5e1",
				strokeWidth: 3
			}
		}));
	}, [roadmap]);
	const [nodes] = useNodesState(initialNodes);
	const [edges] = useEdgesState(initialEdges);
	return /* @__PURE__ */ jsxs(PublicLayout, { children: [
		/* @__PURE__ */ jsx(Head, { title: "Demo Interaktif | Kembangin" }),
		/* @__PURE__ */ jsx("div", {
			className: "bg-amber-50 border-b border-amber-100 py-4 px-4 sticky top-16 z-40",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ jsx("div", {
						className: "w-8 h-8 bg-amber-500 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-amber-500/20",
						children: /* @__PURE__ */ jsx(Info, { className: "w-4 h-4" })
					}), /* @__PURE__ */ jsxs("p", {
						className: "text-xs text-amber-900 font-black uppercase tracking-tight",
						children: ["Interactive Demo Mode — ", /* @__PURE__ */ jsx("span", {
							className: "font-medium text-amber-700 normal-case",
							children: "Sedang menampilkan simulasi data profil Budi Santoso"
						})]
					})]
				}), /* @__PURE__ */ jsx(Link, {
					href: "/register",
					className: "bg-navy-900 text-white text-[10px] uppercase tracking-[0.2em] font-black px-6 py-2.5 rounded-xl hover:bg-teal-600 transition-all shadow-xl shadow-navy-900/10",
					children: "Coba dengan CV Kamu Sekarang"
				})]
			})
		}),
		/* @__PURE__ */ jsxs("main", {
			className: "max-w-7xl mx-auto px-4 py-12",
			children: [/* @__PURE__ */ jsx("div", {
				className: "flex overflow-x-auto gap-2 bg-slate-100 p-2 rounded-[2rem] mb-12 no-scrollbar shadow-inner",
				children: [
					{
						id: "dashboard",
						label: "Dashboard",
						icon: Zap
					},
					{
						id: "analysis",
						label: "Skill Analysis",
						icon: Target
					},
					{
						id: "roadmap",
						label: "Learning Roadmap",
						icon: Map
					},
					{
						id: "market",
						label: "Job Market",
						icon: Briefcase
					}
				].map((tab) => /* @__PURE__ */ jsxs("button", {
					onClick: () => setActiveTab(tab.id),
					className: `flex items-center gap-2 px-8 py-4 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id ? "bg-white text-navy-900 shadow-md transform scale-[1.02]" : "text-slate-500 hover:text-navy-900"}`,
					children: [/* @__PURE__ */ jsx(tab.icon, { className: `w-4 h-4 ${activeTab === tab.id ? "text-teal-500" : ""}` }), tab.label]
				}, tab.id))
			}), /* @__PURE__ */ jsxs("div", {
				className: "min-h-[650px] relative",
				children: [
					activeTab === "dashboard" && /* @__PURE__ */ jsxs("div", {
						className: "space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 lg:grid-cols-12 gap-8 text-left",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "lg:col-span-4 bg-white rounded-4xl p-10 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group",
								children: [
									/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full opacity-50 group-hover:scale-125 transition-transform duration-1000" }),
									/* @__PURE__ */ jsx("h3", {
										className: "font-black text-navy-900 text-xs uppercase tracking-[0.2em] mb-8 relative z-10",
										children: "Work Readiness Score"
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "relative w-full h-[220px] flex items-center justify-center translate-y-4",
										children: [/* @__PURE__ */ jsx(ResponsiveContainer, {
											width: "100%",
											height: "100%",
											children: /* @__PURE__ */ jsxs(RadialBarChart, {
												innerRadius: "74%",
												outerRadius: "100%",
												startAngle: 180,
												endAngle: 0,
												data: [{
													value: work_readiness.score,
													fill: "#0d9488"
												}],
												children: [/* @__PURE__ */ jsx(PolarAngleAxis, {
													type: "number",
													domain: [0, 100],
													tick: false
												}), /* @__PURE__ */ jsx(RadialBar, {
													background: { fill: "#f1f5f9" },
													dataKey: "value",
													cornerRadius: 16
												})]
											})
										}), /* @__PURE__ */ jsx("div", {
											className: "absolute inset-0 flex flex-col items-center justify-center mt-10",
											children: /* @__PURE__ */ jsxs("span", {
												className: "text-6xl font-black text-navy-900 leading-none tracking-tighter",
												children: [work_readiness.score, "%"]
											})
										})]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "mt-6 px-6 py-2 bg-teal-50 text-teal-600 text-[10px] font-black rounded-full uppercase tracking-[0.2em] relative z-10",
										children: work_readiness.category
									})
								]
							}), /* @__PURE__ */ jsx("div", {
								className: "lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4",
								children: [
									{
										label: "Skill Dimiliki",
										value: "7 Skill",
										icon: CheckCircle2,
										bg: "bg-teal-50",
										text: "text-teal-600"
									},
									{
										label: "Target Karir",
										value: profile.career_target,
										icon: Target,
										bg: "bg-navy-50",
										text: "text-navy-900"
									},
									{
										label: "Progres Roadmap",
										value: "2 / 5",
										icon: TrendingUp,
										bg: "bg-indigo-50",
										text: "text-indigo-600"
									},
									{
										label: "Pasar Aktif",
										value: "1.284",
										icon: Flame,
										bg: "bg-orange-50",
										text: "text-orange-600"
									}
								].map((stat, i) => /* @__PURE__ */ jsxs("div", {
									className: "bg-white p-8 rounded-4xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-teal-500/50 transition-all",
									children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2",
										children: stat.label
									}), /* @__PURE__ */ jsx("h4", {
										className: "text-3xl font-black text-navy-900 group-hover:text-teal-600 transition-colors",
										children: stat.value
									})] }), /* @__PURE__ */ jsx("div", {
										className: `w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.text} shadow-sm group-hover:rotate-6 transition-transform`,
										children: /* @__PURE__ */ jsx(stat.icon, { className: "w-6 h-6" })
									})]
								}, i))
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 lg:grid-cols-12 gap-8 text-left",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "lg:col-span-8 bg-white rounded-4xl p-10 border border-slate-100 shadow-sm",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between mb-10",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "text-xl font-black text-navy-900 uppercase tracking-tighter",
										children: "Rekomendasi Karir"
									}), /* @__PURE__ */ jsxs("button", {
										onClick: () => setActiveTab("market"),
										className: "text-[10px] font-black text-teal-600 uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-3 transition-all",
										children: ["Intel Pasar Baru ", /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })]
									})]
								}), /* @__PURE__ */ jsx("div", {
									className: "space-y-4",
									children: recommended_jobs.slice(0, 3).map((job, i) => /* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between p-6 rounded-4xl border border-slate-50 hover:border-teal-100 hover:shadow-xl hover:shadow-teal-500/5 transition-all group cursor-pointer",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-6",
											children: [/* @__PURE__ */ jsx("div", {
												className: "w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-navy-900 shadow-inner group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors",
												children: /* @__PURE__ */ jsx(Briefcase, { className: "w-6 h-6" })
											}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
												className: "font-black text-navy-900 text-lg leading-tight mb-1",
												children: job.title
											}), /* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest",
												children: [
													/* @__PURE__ */ jsx("span", { children: job.company }),
													/* @__PURE__ */ jsx("div", { className: "w-1 h-1 bg-slate-200 rounded-full" }),
													/* @__PURE__ */ jsx("span", {
														className: "text-teal-500",
														children: job.salary
													})
												]
											})] })]
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex flex-col items-end gap-2",
											children: [/* @__PURE__ */ jsxs("span", {
												className: "px-4 py-1.5 bg-teal-50 text-teal-600 text-[10px] font-black rounded-xl uppercase tracking-widest",
												children: [job.match, "% MATCH"]
											}), /* @__PURE__ */ jsx("p", {
												className: "text-[10px] font-black text-slate-300 uppercase tracking-tighter",
												children: "Verified Job"
											})]
										})]
									}, i))
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "lg:col-span-4 bg-navy-900 text-white p-10 rounded-4xl flex flex-col justify-center items-center text-center relative overflow-hidden group",
								children: [
									/* @__PURE__ */ jsx("div", { className: "absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-1000" }),
									/* @__PURE__ */ jsx("div", {
										className: "w-20 h-20 bg-teal-500 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-teal-500/30 relative z-10 group-hover:rotate-12 transition-transform",
										children: /* @__PURE__ */ jsx(Zap, { className: "w-10 h-10" })
									}),
									/* @__PURE__ */ jsxs("h3", {
										className: "text-2xl font-black mb-4 leading-tight text-balance relative z-10 tracking-tight",
										children: [
											"Capai ",
											/* @__PURE__ */ jsx("span", {
												className: "text-teal-400",
												children: "Roadmap"
											}),
											" Berikutnya"
										]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-navy-300 text-sm mb-10 leading-relaxed font-medium relative z-10",
										children: "Selesaikan milestone berikutnya untuk menaikkan skor kesiapan kerjamu sebesar 12%."
									}),
									/* @__PURE__ */ jsx("button", {
										onClick: () => setActiveTab("roadmap"),
										className: "w-full bg-white text-navy-900 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-slate-50 transition-all relative z-10 active:scale-95",
										children: "Selidiki Roadmap"
									})
								]
							})]
						})]
					}),
					activeTab === "analysis" && /* @__PURE__ */ jsx("div", {
						className: "animate-in fade-in slide-in-from-bottom-4 duration-700 text-left",
						children: /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 lg:grid-cols-2 gap-8 items-start",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "bg-white rounded-4xl p-10 border border-slate-100 shadow-sm h-full relative overflow-hidden",
								children: [/* @__PURE__ */ jsxs("h3", {
									className: "font-black text-lg text-navy-900 mb-10 uppercase tracking-widest flex items-center gap-3",
									children: [/* @__PURE__ */ jsx(Target, { className: "text-teal-500 w-5 h-5" }), "Skill Gap Radar"]
								}), /* @__PURE__ */ jsx("div", {
									className: "h-[420px] w-full",
									children: /* @__PURE__ */ jsx(ResponsiveContainer, {
										width: "100%",
										height: "100%",
										children: /* @__PURE__ */ jsxs(RadarChart, {
											cx: "50%",
											cy: "50%",
											outerRadius: "80%",
											data: chartData,
											children: [
												/* @__PURE__ */ jsx(PolarGrid, {
													stroke: "#e2e8f0",
													strokeDasharray: "4 4"
												}),
												/* @__PURE__ */ jsx(PolarAngleAxis, {
													dataKey: "subject",
													tick: {
														fill: "#64748b",
														fontSize: 10,
														fontWeight: "bold"
													}
												}),
												/* @__PURE__ */ jsx(Radar, {
													name: "Market Demand",
													dataKey: "demand",
													stroke: "#0d9488",
													strokeWidth: 3,
													fill: "#0d9488",
													fillOpacity: .05
												}),
												/* @__PURE__ */ jsx(Radar, {
													name: "My Skills",
													dataKey: "score",
													stroke: "#f59e0b",
													strokeWidth: 3,
													fill: "#f59e0b",
													fillOpacity: .4
												}),
												/* @__PURE__ */ jsx(Tooltip, { contentStyle: {
													borderRadius: "1.5rem",
													border: "none",
													boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
													fontWeight: "bold"
												} }),
												/* @__PURE__ */ jsx(Legend, { wrapperStyle: {
													paddingTop: "20px",
													fontWeight: "bold",
													fontSize: "10px",
													textTransform: "uppercase"
												} })
											]
										})
									})
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "bg-white rounded-4xl p-10 border border-slate-100 shadow-sm",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "font-black text-lg text-navy-900 mb-8 uppercase tracking-widest",
									children: "Detil Analisis Per Skill"
								}), /* @__PURE__ */ jsx("div", {
									className: "space-y-4",
									children: skill_gap.map((item, i) => /* @__PURE__ */ jsxs("div", {
										className: "p-5 rounded-3xl border border-slate-50 flex items-center justify-between group hover:border-teal-100 transition-all",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-5",
											children: [/* @__PURE__ */ jsx("div", { className: `w-3 h-3 rounded-full shadow-inner ${item.status === "completed" ? "bg-teal-500 shadow-teal-500/50" : item.status === "developing" ? "bg-amber-500 shadow-amber-500/50" : "bg-rose-500 shadow-rose-500/50"}` }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
												className: "text-sm font-black text-navy-900 uppercase tracking-tight",
												children: item.skill
											}), /* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ jsxs("span", {
													className: "text-[10px] text-slate-400 uppercase font-black tracking-widest",
													children: [
														"Demand: ",
														item.market_demand,
														"%"
													]
												}), /* @__PURE__ */ jsx("span", {
													className: `text-[10px] font-black uppercase tracking-widest ${item.trend === "rising" ? "text-teal-600" : "text-slate-400"}`,
													children: item.trend === "rising" ? "↑ Rising" : "→ Stable"
												})]
											})] })]
										}), /* @__PURE__ */ jsx("span", {
											className: `text-[10px] px-3 py-1.5 rounded-xl font-black uppercase tracking-widest ${item.status === "completed" ? "bg-teal-50 text-teal-600" : item.status === "developing" ? "bg-amber-50 text-amber-600" : "bg-rose-50 text-rose-600"}`,
											children: item.status.toUpperCase()
										})]
									}, i))
								})]
							})]
						})
					}),
					activeTab === "roadmap" && /* @__PURE__ */ jsxs("div", {
						className: "animate-in fade-in slide-in-from-bottom-4 duration-700 h-[650px] border border-slate-200 rounded-4xl overflow-hidden bg-slate-50 relative shadow-inner",
						children: [/* @__PURE__ */ jsxs(ReactFlow, {
							nodes,
							edges,
							fitView: true,
							children: [/* @__PURE__ */ jsx(Background, {
								color: "#cbd5e1",
								variant: BackgroundVariant.Dots,
								gap: 24,
								size: 1.5
							}), /* @__PURE__ */ jsx(Controls, { style: {
								borderRadius: "1.25rem",
								overflow: "hidden",
								border: "1px solid #e2e8f0",
								boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)"
							} })]
						}), /* @__PURE__ */ jsx("div", {
							className: "absolute top-8 left-8 max-w-sm space-y-4 pointer-events-none",
							children: /* @__PURE__ */ jsxs("div", {
								className: "bg-white/95 backdrop-blur-xl p-8 rounded-4xl border border-white shadow-2xl pointer-events-auto text-left relative overflow-hidden group",
								children: [
									/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-2 h-full bg-teal-500 opacity-20 group-hover:opacity-100 transition-opacity" }),
									/* @__PURE__ */ jsx("p", {
										className: "text-[10px] font-black text-teal-600 uppercase tracking-[0.2em] mb-2",
										children: "Karir Target"
									}),
									/* @__PURE__ */ jsx("h4", {
										className: "font-black text-navy-900 text-2xl mb-4 leading-none tracking-tight",
										children: profile.career_target
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-xs text-slate-500 leading-relaxed font-medium",
										children: "Ini adalah learning path yang dibuat AI berdasarkan cv kamu. Tap milestone untuk melihat detail project."
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "mt-8 pt-6 border-t border-slate-100 flex items-center gap-4",
										children: [/* @__PURE__ */ jsx("div", {
											className: "flex -space-x-2",
											children: [
												1,
												2,
												3
											].map((i) => /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-slate-100 border-2 border-white shadow-sm" }, i))
										}), /* @__PURE__ */ jsx("span", {
											className: "text-[10px] font-black text-navy-900 uppercase tracking-widest",
											children: "12 Mahasiswa mengikuti path ini"
										})]
									})
								]
							})
						})]
					}),
					activeTab === "market" && /* @__PURE__ */ jsx("div", {
						className: "animate-in fade-in slide-in-from-bottom-4 duration-700 text-left",
						children: /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 lg:grid-cols-12 gap-8",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "lg:col-span-8 space-y-4",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex bg-white p-4 rounded-4xl border border-slate-100 shadow-sm gap-4 mb-6 sticky top-0 z-10 backdrop-blur-xl",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex-1 flex items-center gap-4 px-4 bg-slate-50 rounded-2xl border border-slate-50 focus-within:border-teal-500/50 transition-colors group",
											children: [/* @__PURE__ */ jsx(Search, { className: "w-5 h-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" }), /* @__PURE__ */ jsx("input", {
												type: "text",
												placeholder: "Cari posisi kerja (misal: React Developer)...",
												className: "flex-1 bg-transparent border-none text-sm font-black uppercase tracking-tight focus:ring-0 placeholder:text-slate-300",
												disabled: true
											})]
										}),
										/* @__PURE__ */ jsx("div", { className: "w-px h-8 bg-slate-100 my-auto" }),
										/* @__PURE__ */ jsxs("button", {
											className: "flex items-center gap-3 px-6 py-3 bg-navy-900 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-teal-600 transition-all shadow-lg shadow-navy-900/10",
											children: [/* @__PURE__ */ jsx(Filter, { className: "w-4 h-4" }), " Filter"]
										})
									]
								}), /* @__PURE__ */ jsx("div", {
									className: "grid grid-cols-1 gap-4",
									children: recommended_jobs.map((job, i) => /* @__PURE__ */ jsxs("div", {
										className: "bg-white p-8 rounded-4xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-teal-500 transition-all cursor-pointer relative overflow-hidden",
										children: [
											/* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-1.5 h-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-all" }),
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-6",
												children: [/* @__PURE__ */ jsx("div", {
													className: "w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-navy-900 group-hover:bg-teal-50 shadow-inner transition-all transform group-hover:rotate-6 group-hover:scale-110",
													children: /* @__PURE__ */ jsx(Briefcase, { className: "w-7 h-7 group-hover:text-teal-600" })
												}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h5", {
													className: "font-black text-navy-900 text-xl leading-none mb-2 tracking-tight",
													children: job.title
												}), /* @__PURE__ */ jsxs("div", {
													className: "flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest",
													children: [
														/* @__PURE__ */ jsxs("span", {
															className: "flex items-center gap-1.5",
															children: [
																/* @__PURE__ */ jsx(Info, { className: "w-3.5 h-3.5 text-slate-300" }),
																" ",
																job.company
															]
														}),
														/* @__PURE__ */ jsx("div", { className: "w-1 h-1 bg-slate-200 rounded-full" }),
														/* @__PURE__ */ jsx("span", {
															className: "text-teal-600",
															children: "Full-Time"
														}),
														/* @__PURE__ */ jsx("div", { className: "w-1 h-1 bg-slate-200 rounded-full" }),
														/* @__PURE__ */ jsx("span", { children: "Jakarta Raya" })
													]
												})] })]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center md:items-end justify-between md:flex-col gap-3 pt-6 md:pt-0 border-t md:border-t-0 border-slate-50",
												children: [/* @__PURE__ */ jsxs("span", {
													className: "px-4 py-2 bg-teal-50 text-teal-600 text-[10px] font-black rounded-xl uppercase tracking-widest shadow-sm ring-1 ring-teal-500/10",
													children: [job.match, "% MATCH"]
												}), /* @__PURE__ */ jsx("span", {
													className: "text-sm font-black text-navy-900 tracking-tight",
													children: job.salary
												})]
											})
										]
									}, i))
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "lg:col-span-4 space-y-6 text-left",
								children: /* @__PURE__ */ jsxs("div", {
									className: "bg-white rounded-4xl p-10 border border-slate-100 shadow-sm relative overflow-hidden group",
									children: [
										/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-2 h-full bg-amber-500 opacity-20 group-hover:opacity-100 transition-opacity" }),
										/* @__PURE__ */ jsxs("h4", {
											className: "text-xs font-black text-navy-900 mb-10 uppercase tracking-[0.2em] flex items-center gap-3",
											children: [/* @__PURE__ */ jsx(Zap, { className: "text-amber-500 w-5 h-5 group-hover:scale-125 transition-transform" }), "Market Intelligence"]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "space-y-6",
											children: [
												{
													skill: "TypeScript",
													trend: "↑ 40.2%",
													desc: "Standar baku startup tier-1 2026"
												},
												{
													skill: "Next.js 16",
													trend: "↑ 28.5%",
													desc: "Adopsi App Router & Server Actions"
												},
												{
													skill: "Tailwind CSS v4",
													trend: "↑ 22.1%",
													desc: "Utility-first standar industri"
												},
												{
													skill: "Vitest / Jest",
													trend: "↑ 15.8%",
													desc: "Testing menjadi skill wajib"
												}
											].map((s, i) => /* @__PURE__ */ jsxs("div", {
												className: "border-b border-slate-50 pb-5 last:border-0 last:pb-0 group/item",
												children: [/* @__PURE__ */ jsxs("div", {
													className: "flex items-center justify-between mb-2",
													children: [/* @__PURE__ */ jsx("span", {
														className: "font-black text-navy-900 text-sm tracking-tight group-hover/item:text-teal-600 transition-colors lowercase first-letter:uppercase",
														children: s.skill
													}), /* @__PURE__ */ jsx("span", {
														className: "text-[10px] font-black text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md shadow-sm",
														children: s.trend
													})]
												}), /* @__PURE__ */ jsx("p", {
													className: "text-[10px] text-slate-400 font-bold uppercase tracking-widest",
													children: s.desc
												})]
											}, i))
										}),
										/* @__PURE__ */ jsx("div", {
											className: "mt-10 pt-8 border-t border-slate-50",
											children: /* @__PURE__ */ jsx("p", {
												className: "text-[10px] text-slate-300 font-bold uppercase tracking-widest leading-relaxed",
												children: "Intelijen pasar diekstrak dari 2.847 lowongan aktif dalam 24 jam terakhir."
											})
										})
									]
								})
							})]
						})
					})
				]
			})]
		})
	] });
}
//#endregion
//#region resources/js/Pages/Error.tsx
var Error_exports = /* @__PURE__ */ __exportAll({ default: () => Error });
function Error({ status }) {
	return /* @__PURE__ */ jsxs(PublicLayout, { children: [/* @__PURE__ */ jsx(Head, { title: `${status} - Ada Masalah` }), /* @__PURE__ */ jsxs("div", {
		className: "min-h-[75vh] flex items-center justify-center px-4 relative overflow-hidden",
		children: [/* @__PURE__ */ jsx("div", {
			className: "absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-[0.03]",
			children: /* @__PURE__ */ jsx("span", {
				className: "text-[30rem] font-black leading-none",
				children: status
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "text-center max-w-lg relative z-10",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "relative inline-block mb-10",
					children: [/* @__PURE__ */ jsx("div", {
						className: "text-8xl md:text-9xl animate-bounce drop-shadow-2xl",
						children: status === 404 ? "🕵️‍♂️" : status === 500 ? "💥" : "🚫"
					}), /* @__PURE__ */ jsx("div", {
						className: "absolute -bottom-4 -right-4 bg-rose-500 text-white font-black text-xl px-4 py-2 rounded-2xl shadow-xl transform rotate-12",
						children: status
					})]
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "text-4xl md:text-5xl font-black text-navy-900 mb-6 tracking-tighter uppercase tracking-widest leading-tight",
					children: status === 404 ? "Halaman Tidak Ditemukan" : "Server Berada di Luar Kendali"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-slate-500 text-base md:text-lg mb-12 leading-relaxed font-bold uppercase tracking-tight text-balance",
					children: status === 404 ? "Sepertinya kamu mencari halaman yang tidak ada. Mungkin URL-nya salah, atau halaman ini sudah dipindahkan ke dimensi lain." : "Terjadi kegagalan sistem terpusat di server kami. Tim mekanik AI kami sedang memperbaikinya secepat mungkin."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap gap-5 justify-center",
					children: [/* @__PURE__ */ jsx(Link, {
						href: "/",
						className: "bg-navy-900 text-white px-10 py-5 rounded-3xl text-xs font-black uppercase tracking-[0.2em] hover:bg-teal-600 transition-all shadow-2xl shadow-navy-900/10 hover:scale-105 active:scale-95",
						children: "Kembali ke Home"
					}), /* @__PURE__ */ jsx(Link, {
						href: "/demo",
						className: "border-2 border-slate-100 text-slate-700 px-10 py-5 rounded-3xl text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-50 transition-all hover:border-slate-300",
						children: "Lihat Demo Interaktif"
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-16 pt-8 border-t border-slate-100 flex items-center justify-center gap-6",
					children: /* @__PURE__ */ jsx("p", {
						className: "text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]",
						children: "Kembangin System v2.5"
					})
				})
			]
		})]
	})] });
}
//#endregion
//#region resources/js/Pages/Faq.tsx
var Faq_exports = /* @__PURE__ */ __exportAll({ default: () => Faq });
function FaqItem({ faq, index }) {
	const [open, setOpen] = useState(false);
	return /* @__PURE__ */ jsxs(motion.div, {
		initial: {
			opacity: 0,
			y: 10
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: { delay: index * .05 },
		className: "border border-slate-100 rounded-2xl overflow-hidden bg-white hover:border-teal-100 transition-colors",
		children: [/* @__PURE__ */ jsxs("button", {
			onClick: () => setOpen(!open),
			className: "w-full flex justify-between items-center px-8 py-6 text-left hover:bg-slate-50/50 transition-colors group",
			children: [/* @__PURE__ */ jsx("span", {
				className: "font-black text-gray-900 text-sm pr-6 group-hover:text-teal-600 transition-colors uppercase tracking-tight",
				children: faq.q
			}), /* @__PURE__ */ jsx("span", {
				className: `text-slate-300 transition-transform duration-500 flex-shrink-0 ${open ? "rotate-180 text-teal-500" : ""}`,
				children: /* @__PURE__ */ jsx("svg", {
					width: "24",
					height: "24",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "3",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					children: /* @__PURE__ */ jsx("path", { d: "M6 9l6 6 6-6" })
				})
			})]
		}), /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(motion.div, {
			initial: {
				height: 0,
				opacity: 0
			},
			animate: {
				height: "auto",
				opacity: 1
			},
			exit: {
				height: 0,
				opacity: 0
			},
			transition: {
				duration: .4,
				ease: [
					.04,
					.62,
					.23,
					.98
				]
			},
			className: "overflow-hidden",
			children: /* @__PURE__ */ jsx("div", {
				className: "px-8 pb-8 text-sm text-slate-500 leading-relaxed border-t border-slate-50 pt-6 bg-slate-50/20 font-medium",
				children: faq.a
			})
		}) })]
	});
}
function Faq({ faqs }) {
	return /* @__PURE__ */ jsxs(PublicLayout, { children: [/* @__PURE__ */ jsx("section", {
		className: "pt-20 pb-12 px-4 text-center",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-2xl mx-auto",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-xs font-black text-teal-600 uppercase tracking-[0.2em] mb-4",
					children: "Pusat Bantuan"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "text-4xl font-black text-gray-900 mb-6 leading-tight",
					children: "Pertanyaan yang Sering Ditanyakan"
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "text-gray-500 text-lg leading-relaxed font-medium",
					children: [
						"Tidak menemukan jawaban yang kamu cari? ",
						/* @__PURE__ */ jsx("br", { className: "sm:hidden" }),
						" ",
						/* @__PURE__ */ jsx("a", {
							href: "mailto:hello@kembangin.id",
							className: "text-teal-600 hover:text-teal-700 transition-colors font-black underline decoration-2 underline-offset-4",
							children: "Hubungi tim kami"
						})
					]
				})
			]
		})
	}), /* @__PURE__ */ jsxs("section", {
		className: "pb-28 px-4",
		children: [/* @__PURE__ */ jsx("div", {
			className: "max-w-3xl mx-auto space-y-4",
			children: faqs.map((faq, i) => /* @__PURE__ */ jsx(FaqItem, {
				faq,
				index: i
			}, i))
		}), /* @__PURE__ */ jsxs("div", {
			className: "max-w-3xl mx-auto mt-24 bg-navy-900 rounded-[3rem] p-12 text-center border border-slate-800 relative overflow-hidden group",
			children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.1),transparent_50%)]" }), /* @__PURE__ */ jsxs("div", {
				className: "relative z-10",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "font-black text-white text-2xl mb-3 tracking-tight",
						children: "Masih punya pertanyaan?"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm text-navy-300 mb-10 font-medium uppercase tracking-widest",
						children: "Kami di sini untuk membantu kamu mencapai target karirmu."
					}),
					/* @__PURE__ */ jsx("a", {
						href: "mailto:hello@kembangin.id",
						className: "inline-block bg-teal-500 text-white px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-teal-400 transition-all shadow-xl shadow-teal-500/20 hover:scale-105",
						children: "Kirim Pesan"
					})
				]
			})]
		})]
	})] });
}
//#endregion
//#region resources/js/Pages/Features.tsx
var Features_exports = /* @__PURE__ */ __exportAll({ default: () => Features$1 });
var mainFeatures = [
	{
		id: "crawler",
		icon: Search,
		title: "Industry Data Crawler",
		badge: "Harian & Real-time",
		desc: "Kami tidak menggunakan data statis tahun lalu. AI kami terus mendata ribuan lowongan kerja IT aktif di Indonesia setiap hari untuk memetakan skill apa yang benar-benar dibutuhkan pasar saat ini.",
		bullets: [
			"Update harian via JSearch API",
			"Fokus pada pasar tech lokal (Indonesia)",
			"Identifikasi tren naik dan turun per skill",
			"Data meliputi estimasi gaji & preferensi teknologi"
		],
		visualIcon: "🌐",
		color: "teal"
	},
	{
		id: "radar",
		icon: Target,
		title: "Skill Gap Radar",
		badge: "Powered by Gemini AI",
		desc: "Visualisasi radar chart instan yang membandingkan profilmu dengan market demand. Kamu bisa melihat gap secara visual tanpa perlu membaca puluhan deskripsi pekerjaan manual.",
		bullets: [
			"Ekstraksi skill otomatis dari CV (PDF/Teks)",
			"Mapping kategori (Frontend, Backend, dll)",
			"Skor akurasi mapping mencapai 94%",
			"Insight tentang skill mana yang paling mendesak"
		],
		visualIcon: "🎯",
		color: "amber"
	},
	{
		id: "roadmap",
		icon: Map,
		title: "Dynamic Roadmap",
		badge: "Personalized Path",
		desc: "Learning path yang digenerate khusus untuk profilmu. Jika kamu sudah tahu React tapi belum tahu TypeScript, roadmap akan fokus mengisi kekosongan tersebut dengan kurikulum yang relevan.",
		bullets: [
			"Milestone berbasis project konkret",
			"Link resource belajar gratis yang dikurasi",
			"Estimasi waktu belajar yang realistis",
			"Sistem progress tracking yang interaktif"
		],
		visualIcon: "🗺️",
		color: "blue"
	},
	{
		id: "score",
		icon: TrendingUp,
		title: "Work Readiness Score",
		badge: "Measurable Success",
		desc: "Satu skor tunggal untuk mengukur seberapa siap kamu memasuki dunia kerja. Skor ini dihitung dari kombinasi skill, pengalaman navigasi, pendidikan, dan penyelesaian roadmap.",
		bullets: [
			"Feedback per kategori (Skill vs Experience)",
			"Rekomendasi tindakan nyata untuk naik skor",
			"Benchmark terhadap data pelamar industri",
			"Integrasi otomatis dengan progress roadmap"
		],
		visualIcon: "⭐",
		color: "purple"
	}
];
function Features$1() {
	return /* @__PURE__ */ jsxs(PublicLayout, { children: [
		/* @__PURE__ */ jsx("section", {
			className: "pt-24 pb-16 px-4 text-center",
			children: /* @__PURE__ */ jsx("div", {
				className: "max-w-3xl mx-auto",
				children: /* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-[10px] font-black text-teal-600 uppercase tracking-[0.3em] mb-4 bg-teal-50 inline-block px-4 py-1.5 rounded-full shadow-sm",
							children: "Fitur Masa Depan"
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "text-4xl md:text-6xl font-black text-navy-900 mb-8 leading-tight tracking-tighter",
							children: "Teknologi yang Menutup Celah Karirmu"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-slate-500 text-lg md:text-xl leading-relaxed font-medium",
							children: "Kami menggabungkan data pasar kerja real-time dengan Generative AI untuk memberikan panduan karir paling presisi di Indonesia."
						})
					]
				})
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "pb-32 px-4",
			children: /* @__PURE__ */ jsx("div", {
				className: "max-w-7xl mx-auto space-y-40",
				children: mainFeatures.map((f, i) => /* @__PURE__ */ jsxs("div", {
					className: `flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-16 lg:gap-24`,
					children: [/* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							x: i % 2 === 0 ? -30 : 30
						},
						whileInView: {
							opacity: 1,
							x: 0
						},
						viewport: { once: true },
						className: "flex-1 text-left",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: `inline-block px-4 py-1.5 rounded-xl bg-${f.color}-50 text-${f.color}-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm`,
								children: f.badge
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-4 mb-6",
								children: [/* @__PURE__ */ jsx("div", {
									className: `w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-navy-900 shadow-xl shadow-slate-200/50`,
									children: /* @__PURE__ */ jsx(f.icon, { className: "w-7 h-7" })
								}), /* @__PURE__ */ jsx("h2", {
									className: "text-3xl md:text-4xl font-black text-navy-900 tracking-tight",
									children: f.title
								})]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-slate-600 text-sm md:text-base leading-relaxed mb-10 font-medium",
								children: f.desc
							}),
							/* @__PURE__ */ jsx("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 mb-4",
								children: f.bullets.map((b, bi) => /* @__PURE__ */ jsxs("div", {
									className: "flex gap-4",
									children: [/* @__PURE__ */ jsx("div", {
										className: "w-5 h-5 bg-teal-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5 shadow-sm",
										children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3 h-3 text-teal-500" })
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xs text-slate-500 font-black uppercase tracking-tight leading-snug",
										children: b
									})]
								}, bi))
							})
						]
					}), /* @__PURE__ */ jsx(motion.div, {
						initial: {
							opacity: 0,
							scale: .95
						},
						whileInView: {
							opacity: 1,
							scale: 1
						},
						viewport: { once: true },
						className: "flex-1 w-full max-w-xl",
						children: /* @__PURE__ */ jsxs("div", {
							className: "aspect-square bg-slate-50 rounded-4xl border border-slate-100 shadow-inner flex items-center justify-center relative overflow-hidden group",
							children: [
								/* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-10 bg-grid-slate-200 mask-radial-fade" }),
								/* @__PURE__ */ jsx("div", {
									className: "text-[12rem] opacity-5 group-hover:scale-150 group-hover:rotate-12 transition-transform duration-1000 select-none grayscale",
									children: f.visualIcon
								}),
								/* @__PURE__ */ jsx("div", {
									className: "absolute inset-0 flex items-center justify-center",
									children: /* @__PURE__ */ jsxs("div", {
										className: "bg-white/80 backdrop-blur-xl p-10 rounded-4xl border border-white shadow-2xl flex flex-col items-center gap-6 transform -rotate-3 transition-all duration-700 group-hover:rotate-0 group-hover:scale-105",
										children: [/* @__PURE__ */ jsx("div", {
											className: `w-20 h-20 rounded-3xl bg-${f.color}-500 flex items-center justify-center text-white shadow-xl shadow-${f.color}-500/20`,
											children: /* @__PURE__ */ jsx(f.icon, { className: "w-10 h-10" })
										}), /* @__PURE__ */ jsxs("div", {
											className: "text-center",
											children: [/* @__PURE__ */ jsx("p", {
												className: "text-xs font-black text-navy-900 uppercase tracking-[0.3em] mb-1",
												children: "Live Interface"
											}), /* @__PURE__ */ jsx("p", {
												className: "text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none",
												children: "Powered by Google Gemini 2.5"
											})]
										})]
									})
								}),
								/* @__PURE__ */ jsx("div", {
									className: "absolute top-10 right-10 bg-white px-4 py-2 rounded-xl shadow-lg border border-slate-50 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700 font-black text-[10px] text-teal-600 uppercase tracking-widest",
									children: "+42% Growth"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "absolute bottom-10 left-10 bg-navy-900 px-4 py-2 rounded-xl shadow-lg transform -translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700 delay-100 font-black text-[10px] text-white uppercase tracking-widest",
									children: "Data Verified"
								})
							]
						})
					})]
				}, f.id))
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "bg-navy-900 border-y border-slate-800 py-32 px-4 text-white relative overflow-hidden",
			children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(20,184,166,0.05),transparent_50%)]" }), /* @__PURE__ */ jsxs("div", {
				className: "max-w-5xl mx-auto relative z-10",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "text-center mb-20 text-balance",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-3xl md:text-4xl font-black mb-6 tracking-tighter uppercase tracking-widest",
						children: "Kenapa Memilih Kembangin?"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-navy-300 text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed",
						children: "Perbandingan nyata antara metode belajar konvensional yang lambat vs platform kami yang berbasis data."
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-800 border border-slate-800 rounded-4xl overflow-hidden text-left shadow-2xl",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "bg-navy-900 p-12 md:p-16",
						children: [/* @__PURE__ */ jsxs("h3", {
							className: "text-rose-400 font-black text-xs uppercase tracking-[0.3em] mb-12 flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-rose-400 rounded-full animate-pulse" }), " Cara Konvensional"]
						}), /* @__PURE__ */ jsx("div", {
							className: "space-y-8",
							children: [
								{
									t: "Riset Manual Melelahkan",
									d: "Membaca puluhan lowongan kerja satu per satu di LinkedIn tanpa standarisasi."
								},
								{
									t: "Roadmap Statis & Kuno",
									d: "Mengikuti panduan belajar yang sudah tertinggal 1-2 tahun dari tren industri."
								},
								{
									t: "Fokus Teori Berlebihan",
									d: "Belajar tanpa tahu implementasi project apa yang sebenarnya dicari oleh HR."
								},
								{
									t: "Feedback Subjektif",
									d: "Hanya menebak-nebak apakah kamu sudah siap melamar tanpa data pembanding."
								}
							].map((item, i) => /* @__PURE__ */ jsxs("div", {
								className: "opacity-60 grayscale hover:opacity-100 transition-opacity",
								children: [/* @__PURE__ */ jsx("p", {
									className: "font-black text-sm mb-2 line-through decoration-rose-500/50 uppercase tracking-tighter underline-offset-4",
									children: item.t
								}), /* @__PURE__ */ jsx("p", {
									className: "text-[11px] text-navy-400 leading-relaxed font-bold uppercase tracking-widest",
									children: item.d
								})]
							}, i))
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "bg-navy-950 p-12 md:p-16 relative overflow-hidden",
						children: [
							/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-teal-500/5 pulse-slow" }),
							/* @__PURE__ */ jsxs("h3", {
								className: "text-teal-400 font-black text-xs uppercase tracking-[0.3em] mb-12 flex items-center gap-3 relative z-10",
								children: [/* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-teal-400 rounded-full shadow-lg shadow-teal-500" }), " Kembangin"]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "space-y-8 relative z-10",
								children: [
									{
										t: "Otomatisasi Data AI",
										d: "AI kami yang meriset dan merangkum pasar kerja untukmu setiap 24 jam."
									},
									{
										t: "Adaptive Learning Path",
										d: "Roadmap berubah secara dinamis mengikuti pergerakan teknologi terkini."
									},
									{
										t: "Project-First Approach",
										d: "Fokus pada pembangunan portofolio yang terverifikasi standar industri."
									},
									{
										t: "Skor Kesiapan Akurat",
										d: "Pantau progressmu dengan angka yang pasti berdasarkan algoritma data."
									}
								].map((item, i) => /* @__PURE__ */ jsxs("div", {
									className: "transform hover:translate-x-2 transition-transform duration-500",
									children: [/* @__PURE__ */ jsxs("p", {
										className: "font-black text-sm text-white mb-2 flex items-center gap-3 uppercase tracking-tighter underline decoration-teal-500 decoration-2 underline-offset-8",
										children: ["✨ ", item.t]
									}), /* @__PURE__ */ jsx("p", {
										className: "text-[11px] text-navy-300 leading-relaxed font-black tracking-widest uppercase",
										children: item.d
									})]
								}, i))
							})
						]
					})]
				})]
			})]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-32 px-4 text-center",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-2xl mx-auto",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "w-20 h-20 bg-teal-500 rounded-4xl flex items-center justify-center text-white mx-auto mb-10 shadow-2xl shadow-teal-500/30 transform hover:rotate-12 transition-transform",
						children: /* @__PURE__ */ jsx(Cpu, { className: "w-10 h-10" })
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "text-4xl md:text-5xl font-black text-navy-900 mb-8 leading-tight tracking-tighter uppercase tracking-widest",
						children: "Siap Mengambil Kendali Karirmu?"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-slate-500 text-lg mb-12 max-w-sm mx-auto leading-relaxed font-medium",
						children: "Bergabunglah dengan 1.200+ mahasiswa lainnya yang telah membangun karir IT mereka berbasis data."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap gap-5 justify-center",
						children: [/* @__PURE__ */ jsx(Link, {
							href: "/register",
							className: "bg-navy-900 text-white px-10 py-5 rounded-3xl text-xs font-black uppercase tracking-[0.2em] hover:bg-teal-600 transition-all shadow-2xl shadow-navy-900/20 hover:scale-105 active:scale-95",
							children: "Buat Akun Sekarang"
						}), /* @__PURE__ */ jsx(Link, {
							href: "/demo",
							className: "border-2 border-slate-100 text-slate-600 px-10 py-5 rounded-3xl text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-50 transition-all hover:border-slate-300",
							children: "Lihat Demo"
						})]
					})
				]
			})
		})
	] });
}
//#endregion
//#region resources/js/Pages/Help.tsx
var Help_exports = /* @__PURE__ */ __exportAll({ default: () => Help });
var helpSections = [
	{
		title: "Kontak Cepat",
		description: "Hubungi tim kami untuk bantuan teknis atau pertanyaan akun.",
		items: [{
			label: "Email",
			value: "hello@kembangin.id"
		}, {
			label: "WhatsApp",
			value: "+62 812-3456-7890"
		}]
	},
	{
		title: "Panduan Penggunaan",
		description: "Langkah cepat agar analisis CV kamu berjalan lancar.",
		items: [
			{
				label: "Format CV",
				value: "PDF / DOCX / TXT"
			},
			{
				label: "Ukuran file",
				value: "Maksimum 5 MB"
			},
			{
				label: "Tips",
				value: "Gunakan format yang jelas dan terbaru"
			}
		]
	},
	{
		title: "Jam Layanan",
		description: "Kami aktif di hari kerja untuk membantu kamu.",
		items: [{
			label: "Senin - Jumat",
			value: "09:00 - 18:00 WIB"
		}, {
			label: "Sabtu",
			value: "10:00 - 14:00 WIB"
		}]
	}
];
function Help() {
	return /* @__PURE__ */ jsx(AppLayout, {
		header: "Help",
		children: /* @__PURE__ */ jsxs("div", {
			className: "pt-4 pb-12 px-4",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "max-w-4xl mx-auto text-center mb-10",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-xs font-black text-[#2563EB] uppercase tracking-[0.2em] mb-3",
						children: "Help Center"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "text-3xl font-black text-gray-900 mb-4",
						children: "Butuh Bantuan?"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-gray-500 text-sm leading-relaxed font-medium",
						children: "Kami siap membantu kamu secepat mungkin. Pilih topik bantuan di bawah ini."
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5",
				children: helpSections.map((section) => /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-3xl p-6 shadow-sm border border-slate-100",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "text-lg font-black text-gray-900 mb-2",
							children: section.title
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-sm text-slate-500 mb-4",
							children: section.description
						}),
						/* @__PURE__ */ jsx("div", {
							className: "space-y-2 text-sm",
							children: section.items.map((item) => /* @__PURE__ */ jsxs("div", {
								className: "flex justify-between gap-3",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-slate-400",
									children: item.label
								}), /* @__PURE__ */ jsx("span", {
									className: "font-semibold text-gray-900 text-right",
									children: item.value
								})]
							}, item.label))
						})
					]
				}, section.title))
			})]
		})
	});
}
//#endregion
//#region resources/js/Pages/HowItWorks.tsx
var HowItWorks_exports = /* @__PURE__ */ __exportAll({ default: () => HowItWorks$1 });
function PremiumFooter() {
	return /* @__PURE__ */ jsxs("footer", {
		className: "bg-slate-950 text-slate-400 border-t border-slate-900 pt-24 pb-12 overflow-hidden relative",
		children: [
			/* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" }),
			/* @__PURE__ */ jsx("div", { className: "absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-primary/10 blur-[100px] rounded-full pointer-events-none" }),
			/* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto px-6 lg:px-8",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-20",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "lg:col-span-1",
							children: [
								/* @__PURE__ */ jsxs(Link, {
									href: "/",
									className: "flex items-center gap-3 mb-8",
									children: [/* @__PURE__ */ jsx("div", {
										className: "w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20",
										children: /* @__PURE__ */ jsx("img", {
											src: "/logo1.svg",
											alt: "Logo",
											className: "w-6 h-6 object-contain invert brightness-0"
										})
									}), /* @__PURE__ */ jsx("span", {
										className: "text-2xl font-bold text-white tracking-tight font-[family-name:var(--font-heading)]",
										children: "Kembangin"
									})]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-base leading-relaxed mb-8 max-w-sm text-slate-400 font-medium",
									children: "Solusi cerdas berbasis AI untuk mengakselerasi karier digital Anda dengan menjembatani kesenjangan antara pendidikan dan industri."
								}),
								/* @__PURE__ */ jsx("div", {
									className: "flex items-center gap-4",
									children: [
										{
											icon: Send,
											href: "#",
											label: "Twitter"
										},
										{
											icon: Briefcase,
											href: "#",
											label: "LinkedIn"
										},
										{
											icon: Cpu,
											href: "#",
											label: "GitHub"
										},
										{
											icon: Camera,
											href: "#",
											label: "Instagram"
										}
									].map((social, i) => /* @__PURE__ */ jsx("a", {
										href: social.href,
										className: "w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary/20 hover:border-primary/50 transition-all duration-300",
										"aria-label": social.label,
										children: /* @__PURE__ */ jsx(social.icon, { className: "w-5 h-5" })
									}, i))
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
							className: "text-white font-bold text-xl mb-8 font-[family-name:var(--font-heading)]",
							children: "Produk"
						}), /* @__PURE__ */ jsx("ul", {
							className: "space-y-4",
							children: [
								{
									name: "Fitur Utama",
									href: "#features"
								},
								{
									name: "Cara Kerja",
									href: "#how-it-works"
								},
								{
									name: "Market Insights",
									href: "/market"
								},
								{
									name: "Skill Assessment",
									href: "/assessment"
								}
							].map((link, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
								href: link.href,
								className: "text-base hover:text-white transition-colors duration-200 flex items-center group",
								children: [/* @__PURE__ */ jsx("div", { className: "w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100" }), link.name]
							}) }, i))
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
							className: "text-white font-bold text-xl mb-8 font-[family-name:var(--font-heading)]",
							children: "Sumber"
						}), /* @__PURE__ */ jsx("ul", {
							className: "space-y-4",
							children: [
								{
									name: "Blog Karier",
									href: "/blog"
								},
								{
									name: "Dokumentasi",
									href: "/docs"
								},
								{
									name: "FAQ",
									href: "/faq"
								},
								{
									name: "Bantuan",
									href: "/support"
								}
							].map((link, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
								href: link.href,
								className: "text-base hover:text-white transition-colors duration-200 flex items-center group",
								children: [/* @__PURE__ */ jsx("div", { className: "w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100" }), link.name]
							}) }, i))
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("h4", {
								className: "text-white font-bold text-xl mb-8 font-[family-name:var(--font-heading)]",
								children: "Tetap Terhubung"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-base mb-6 text-slate-500 font-medium",
								children: "Dapatkan update terbaru mengenai tren industri dan tips karier digital."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("input", {
									type: "email",
									placeholder: "Email Anda",
									className: "w-full bg-slate-900 border border-slate-800 rounded-xl py-3.5 px-4 text-base focus:outline-none focus:border-primary/50 text-white placeholder:text-slate-600 transition-all"
								}), /* @__PURE__ */ jsx("button", {
									className: "absolute right-1.5 top-1.5 bg-primary hover:bg-primary-dark text-white p-1.5 rounded-lg transition-colors shadow-lg shadow-primary/20",
									children: /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-6 flex items-center gap-3 text-sm text-slate-500 font-medium",
								children: [/* @__PURE__ */ jsx(Mail, { className: "w-5 h-5" }), /* @__PURE__ */ jsx("span", { children: "halo@kembangin.id" })]
							})
						] })
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "text-sm font-medium",
							children: [
								"© ",
								(/* @__PURE__ */ new Date()).getFullYear(),
								" Kembangin. Seluruh hak cipta dilindungi."
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-8 text-sm font-medium",
							children: [/* @__PURE__ */ jsx(Link, {
								href: "/privacy",
								className: "hover:text-white transition-colors",
								children: "Kebijakan Privasi"
							}), /* @__PURE__ */ jsx(Link, {
								href: "/terms",
								className: "hover:text-white transition-colors",
								children: "Syarat & Ketentuan"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 px-4 py-1.5 bg-slate-900 rounded-full border border-slate-800 text-xs font-bold text-slate-500",
							children: [/* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }), "SDG 4 & SDG 8 COMPLIANT"]
						})
					]
				})]
			})
		]
	});
}
function HowItWorks$1() {
	const steps = [
		{
			num: "Step 1",
			title: "Upload Profil & CV Anda",
			desc: "Mulailah dengan mengunggah resume Anda. Teknologi Artificial Intelligence akan langsung memindai, mengekstrak pengalaman, serta daftar keahlian komprehensif Anda dalam hitungan detik.",
			visual: /* @__PURE__ */ jsxs("div", {
				className: "border-2 border-dashed border-slate-300 rounded-[32px] p-8 text-center bg-[#fcfcfc] flex flex-col justify-center h-[340px] shadow-[inset_0_4px_20px_-10px_rgba(0,0,0,0.05)]",
				children: [
					/* @__PURE__ */ jsx(Upload, { className: "w-14 h-14 text-slate-300 mx-auto mb-5" }),
					/* @__PURE__ */ jsx("div", {
						className: "text-lg font-bold text-slate-800 mb-1 font-[family-name:var(--font-heading)]",
						children: "Tarik & Lepas CV di sini"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "text-sm text-slate-500 mb-8 font-medium",
						children: "Mendukung PDF, DOCX (Maks. 5MB)"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "bg-white p-5 rounded-2xl shadow-md border border-slate-100 flex items-center gap-4 text-left max-w-sm mx-auto w-full",
						children: [/* @__PURE__ */ jsx("div", {
							className: "w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center font-black text-sm border border-red-100 shrink-0",
							children: "PDF"
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ jsx("div", {
								className: "text-[15px] font-bold text-slate-800 tracking-tight",
								children: "cv_profil_terbaru.pdf"
							}), /* @__PURE__ */ jsx("div", {
								className: "w-full bg-slate-100 h-2 rounded-full mt-2.5 overflow-hidden flex",
								children: /* @__PURE__ */ jsx("div", { className: "bg-primary w-[75%] h-full rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" })
							})]
						})]
					})
				]
			})
		},
		{
			num: "Step 2",
			title: "Diagnosis Kesenjangan Skill",
			desc: "AI secara otomatis mencocokkan profil Anda dengan kualifikasi dari lowongan kerja riil di industri. Lihat persentase kecocokan dan temukan skill spesifik apa yang harus Anda kejar saat ini juga.",
			visual: /* @__PURE__ */ jsxs("div", {
				className: "bg-white border border-slate-200/60 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] rounded-[32px] p-8 sm:p-10 h-[340px] flex flex-col justify-center",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex justify-between items-center pb-6 border-b border-slate-100 mb-8",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
						className: "text-[11px] text-slate-400 font-black uppercase tracking-widest mb-1",
						children: "Target Posisi"
					}), /* @__PURE__ */ jsx("div", {
						className: "text-xl font-extrabold text-[#1A1A2E] tracking-tight font-[family-name:var(--font-heading)]",
						children: "Software Engineer"
					})] }), /* @__PURE__ */ jsxs("div", {
						className: "text-right",
						children: [/* @__PURE__ */ jsx("div", {
							className: "text-[11px] text-slate-400 font-black uppercase tracking-widest mb-1 font-bold",
							children: "Match"
						}), /* @__PURE__ */ jsx("div", {
							className: "text-3xl font-black text-emerald-500",
							children: "65%"
						})]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
						className: "text-[13px] font-bold text-slate-700 mb-3 flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-500" }), " Keahlian Terpenuhi"]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ jsx("span", {
							className: "px-4 py-2 bg-slate-100 text-slate-700 cursor-default rounded-xl text-[13px] font-bold border border-slate-200",
							children: "PHP Native"
						}), /* @__PURE__ */ jsx("span", {
							className: "px-4 py-2 bg-slate-100 text-slate-700 cursor-default rounded-xl text-[13px] font-bold border border-slate-200",
							children: "MySQL"
						})]
					})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
						className: "text-[13px] font-bold text-slate-700 mb-3 flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-rose-500" }), " Peta Kesenjangan (Gap)"]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ jsx("span", {
							className: "px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-[13px] hover:bg-rose-100 transition-colors font-bold border border-rose-100",
							children: "React.js"
						}), /* @__PURE__ */ jsx("span", {
							className: "px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-[13px] hover:bg-rose-100 transition-colors font-bold border border-rose-100",
							children: "Docker Content"
						})]
					})] })]
				})]
			})
		},
		{
			num: "Step 3",
			title: "Roadmap Belajar Terinci",
			desc: "Tidak ada lagi pembelajaran generik yang membuang waktu. Dapatkan silabus dan rekomendasi materi yang hanya berfokus pada menutup kesenjangan (skill-gap) yang Anda butuhkan secara presisi.",
			visual: /* @__PURE__ */ jsx("div", {
				className: "bg-white border border-slate-200/60 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] rounded-[32px] p-8 sm:p-10 h-[340px] flex items-center justify-center relative overflow-hidden",
				children: /* @__PURE__ */ jsxs("div", {
					className: "relative pl-10 border-l-2 border-slate-100 space-y-10 w-full max-w-sm text-left",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "absolute -left-[51px] top-1 bg-emerald-500 w-5 h-5 rounded-full border-4 border-white flex items-center justify-center",
								children: /* @__PURE__ */ jsx("svg", {
									className: "w-2.5 h-2.5 text-white",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "4",
									viewBox: "0 0 24 24",
									children: /* @__PURE__ */ jsx("path", {
										strokeLinecap: "round",
										strokeLinejoin: "round",
										d: "M5 13l4 4L19 7"
									})
								})
							}),
							/* @__PURE__ */ jsx("div", {
								className: "text-[11px] font-black text-emerald-600 mb-1.5 uppercase tracking-widest font-bold",
								children: "Modul Dasar"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "text-[17px] font-bold text-slate-800 tracking-tight font-[family-name:var(--font-heading)]",
								children: "Pengenalan Ekosistem React"
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [
							/* @__PURE__ */ jsx("div", { className: "absolute -left-[51px] top-1 bg-primary w-5 h-5 rounded-full border-4 border-white shadow-[0_0_0_4px_rgba(59,130,246,0.2)]" }),
							/* @__PURE__ */ jsx("div", {
								className: "text-[11px] font-black text-primary mb-2.5 uppercase tracking-widest font-bold",
								children: "Sedang Berjalan"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "text-[17px] font-bold text-slate-800 bg-primary/5 p-5 rounded-2xl border border-primary/20 tracking-tight relative cursor-pointer hover:bg-primary/10 transition-colors font-[family-name:var(--font-heading)]",
								children: "Containerization dengan Docker"
							})
						]
					})]
				})
			})
		},
		{
			num: "Step 4",
			title: "Pengerjaan Projek Valid",
			desc: "Terapkan apa yang Anda pelajari melalui pembuatan Capstone Project riil. Sistem kami terintegrasi dengan GitHub API untuk memverifikasi struktur kodingan dan progres commit Anda.",
			visual: /* @__PURE__ */ jsxs("div", {
				className: "bg-[#0d1117] rounded-[32px] p-8 h-[340px] flex items-center justify-center relative overflow-hidden",
				children: [/* @__PURE__ */ jsx("div", { className: "absolute top-[-40%] right-[-10%] w-64 h-64 bg-blue-500/20 rounded-full blur-[60px] pointer-events-none" }), /* @__PURE__ */ jsxs("div", {
					className: "w-full max-w-[340px] bg-[#161b22] border border-[#30363d] rounded-3xl p-7 shadow-2xl relative z-10 text-left",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-4 mb-7",
						children: [/* @__PURE__ */ jsx("div", {
							className: "w-12 h-12 bg-white rounded-full flex items-center justify-center border-[3px] border-[#30363d] shrink-0",
							children: /* @__PURE__ */ jsx(Cpu, { className: "w-7 h-7 text-slate-900" })
						}), /* @__PURE__ */ jsxs("div", {
							className: "overflow-hidden",
							children: [/* @__PURE__ */ jsx("div", {
								className: "text-[15px] font-bold text-white truncate tracking-tight font-[family-name:var(--font-heading)]",
								children: "johndoe/docker-capstone"
							}), /* @__PURE__ */ jsx("div", {
								className: "text-[13px] text-[#8b949e] font-medium",
								children: "Public repository"
							})]
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "bg-[#000000] border border-[#30363d] rounded-2xl p-5 mb-5",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between mb-4 border-b border-[#30363d] pb-4",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-[11px] text-[#8b949e] font-mono tracking-widest uppercase font-bold",
								children: "Sync Status"
							}), /* @__PURE__ */ jsxs("span", {
								className: "text-[11px] font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-md flex items-center gap-1 border border-emerald-400/20",
								children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "w-3.5 h-3.5" }), " Verified"]
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex justify-between px-2",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "text-center",
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-2xl font-black text-white leading-none",
									children: "42"
								}), /* @__PURE__ */ jsx("div", {
									className: "text-[10px] text-[#8b949e] uppercase tracking-wider font-bold mt-2",
									children: "Commits"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "text-center",
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-2xl font-black text-white leading-none",
									children: "3"
								}), /* @__PURE__ */ jsx("div", {
									className: "text-[10px] text-[#8b949e] uppercase tracking-wider font-bold mt-2",
									children: "Branches"
								})]
							})]
						})]
					})]
				})]
			})
		},
		{
			num: "Step 5",
			title: "Readiness Score & Karier",
			desc: "Pantau kesiapan kerja Anda melalui Readiness Score yang dinamis. Buktikan kualifikasi kuat Anda kepada ratusan jaringan kemitraan institusi dan HRD ternama.",
			visual: /* @__PURE__ */ jsxs("div", {
				className: "bg-white border border-slate-200/60 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] rounded-[32px] p-8 h-[340px] flex flex-col items-center justify-center relative overflow-hidden",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative inline-flex items-center justify-center mb-8",
					children: [/* @__PURE__ */ jsxs("svg", {
						className: "w-[200px] h-[200px] transform -rotate-90",
						children: [
							/* @__PURE__ */ jsx("circle", {
								cx: "100",
								cy: "100",
								r: "84",
								stroke: "currentColor",
								strokeWidth: "20",
								fill: "transparent",
								className: "text-slate-50"
							}),
							/* @__PURE__ */ jsx("circle", {
								cx: "100",
								cy: "100",
								r: "84",
								stroke: "url(#gradient-score-works-page)",
								strokeWidth: "20",
								fill: "transparent",
								strokeDasharray: "527.7",
								strokeDashoffset: "79.1",
								strokeLinecap: "round",
								className: "text-primary"
							}),
							/* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", {
								id: "gradient-score-works-page",
								x1: "0%",
								y1: "0%",
								x2: "100%",
								y2: "0%",
								children: [/* @__PURE__ */ jsx("stop", {
									offset: "0%",
									stopColor: "#3b82f6"
								}), /* @__PURE__ */ jsx("stop", {
									offset: "100%",
									stopColor: "#8b5cf6"
								})]
							}) })
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "absolute flex flex-col items-center",
						children: /* @__PURE__ */ jsxs("div", {
							className: "text-[72px] leading-none font-black tracking-tight text-[#1A1A2E]",
							children: ["85", /* @__PURE__ */ jsx("span", {
								className: "text-[34px] text-slate-300 font-bold ml-1 font-[family-name:var(--font-heading)]",
								children: "%"
							})]
						})
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "px-8 py-3.5 bg-[#FFF9EA] border border-[#FDE4A9] text-[#C47000] rounded-full text-[15px] font-extrabold flex items-center justify-center gap-3 w-full max-w-[260px] shadow-sm",
					children: [/* @__PURE__ */ jsx(Trophy, { className: "w-[22px] h-[22px] text-[#F59E0B]" }), " Profil Ready to Hire"]
				})]
			})
		}
	];
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-white",
		children: [
			/* @__PURE__ */ jsx(Head, { title: "Cara Kerja — Kembangin" }),
			/* @__PURE__ */ jsx(Navbar, {}),
			/* @__PURE__ */ jsxs("main", {
				className: "relative pt-20 pb-32 overflow-hidden bg-white",
				children: [/* @__PURE__ */ jsx("div", {
					className: "absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-full max-w-[1400px] pointer-events-none hidden lg:block z-0",
					children: /* @__PURE__ */ jsxs("svg", {
						className: "w-full h-full",
						viewBox: "0 0 1400 4800",
						fill: "none",
						preserveAspectRatio: "none",
						children: [
							/* @__PURE__ */ jsx(motion.path, {
								d: "M1200,300 C1100,500 350,600 350,1100 C350,1300 100,1500 350,1900 C600,2300 350,2300 350,2700 C350,3100 100,3100 350,3500 C600,3900 350,3900 350,4300 C350,4700 100,4700 350,4900",
								stroke: "#F1F5F9",
								strokeWidth: "32",
								strokeLinecap: "round"
							}),
							/* @__PURE__ */ jsx("path", {
								d: "M1200,300 C1100,500 350,600 350,1100 C350,1300 100,1500 350,1900 C600,2300 350,2300 350,2700 C350,3100 100,3100 350,3500 C600,3900 350,3900 350,4300 C350,4700 100,4700 350,4900",
								stroke: "url(#line-gradient-blue)",
								strokeWidth: "32",
								strokeLinecap: "round"
							}),
							/* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", {
								id: "line-gradient-blue",
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [
									/* @__PURE__ */ jsx("stop", {
										offset: "0%",
										stopColor: "#60A5FA"
									}),
									/* @__PURE__ */ jsx("stop", {
										offset: "50%",
										stopColor: "#3B82F6"
									}),
									/* @__PURE__ */ jsx("stop", {
										offset: "100%",
										stopColor: "#1D4ED8"
									})
								]
							}) })
						]
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-6 lg:px-8 relative z-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col lg:flex-row items-center gap-16 mb-64 pt-20",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "w-full lg:w-1/2 text-center lg:text-left",
							children: [
								/* @__PURE__ */ jsx(motion.div, {
									initial: {
										opacity: 0,
										y: 20
									},
									animate: {
										opacity: 1,
										y: 0
									},
									className: "inline-flex items-center gap-2 border border-primary/20 text-primary rounded-full px-5 py-1.5 text-sm font-bold mb-8 bg-primary/5",
									children: "AI-Powered Analysis"
								}),
								/* @__PURE__ */ jsxs(motion.h1, {
									initial: {
										opacity: 0,
										y: 20
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: { delay: .1 },
									className: "text-5xl lg:text-7xl font-black text-[#1A1A2E] font-[family-name:var(--font-heading)] mb-8 tracking-tighter",
									children: [
										"Jalan Pintas ",
										/* @__PURE__ */ jsx("br", {}),
										" Menuju",
										/* @__PURE__ */ jsx("br", {}),
										" ",
										/* @__PURE__ */ jsx("span", {
											className: "text-primary",
											children: "Karir Impian."
										})
									]
								}),
								/* @__PURE__ */ jsx(motion.p, {
									initial: {
										opacity: 0,
										y: 20
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: { delay: .2 },
									className: "text-slate-500 text-xl font-medium leading-relaxed max-w-lg",
									children: "Kami membuat proses pengembangan skill menjadi mudah, terukur, dan terarah — semuanya dilakukan secara otomatis."
								})
							]
						}), /* @__PURE__ */ jsx("div", {
							className: "w-full lg:w-1/2 relative flex justify-center",
							children: /* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-2 gap-4",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "bg-blue-50 p-8 rounded-3xl animate-bounce",
										style: { animationDuration: "3s" },
										children: /* @__PURE__ */ jsx(Upload, { className: "w-12 h-12 text-blue-500" })
									}),
									/* @__PURE__ */ jsx("div", {
										className: "bg-yellow-50 p-8 rounded-3xl animate-bounce",
										style: { animationDuration: "4s" },
										children: /* @__PURE__ */ jsx(Trophy, { className: "w-12 h-12 text-yellow-500" })
									}),
									/* @__PURE__ */ jsx("div", {
										className: "bg-emerald-50 p-8 rounded-3xl animate-bounce",
										style: { animationDuration: "3.5s" },
										children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-12 h-12 text-emerald-500" })
									}),
									/* @__PURE__ */ jsx("div", {
										className: "bg-purple-50 p-8 rounded-3xl animate-bounce",
										style: { animationDuration: "4.5s" },
										children: /* @__PURE__ */ jsx(Cpu, { className: "w-12 h-12 text-purple-500" })
									})
								]
							})
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "space-y-[40vh] pb-[20vh]",
						children: steps.map((step, idx) => /* @__PURE__ */ jsxs(motion.div, {
							initial: {
								opacity: 0,
								y: 50
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .8,
								delay: .2
							},
							viewport: {
								once: true,
								margin: "-100px"
							},
							className: "flex flex-col lg:flex-row items-center gap-16 lg:gap-32",
							children: [/* @__PURE__ */ jsx("div", {
								className: "w-full lg:w-1/2 flex justify-center order-2 lg:order-1",
								children: /* @__PURE__ */ jsxs("div", {
									className: "relative w-full max-w-lg",
									children: [/* @__PURE__ */ jsx("div", { className: "absolute -inset-10 bg-slate-50 rounded-full blur-[80px] opacity-40 pointer-events-none" }), /* @__PURE__ */ jsx("div", {
										className: "relative",
										children: step.visual
									})]
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "w-full lg:w-1/2 text-center lg:text-left order-1 lg:order-2",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "text-5xl font-black text-slate-900 mb-6 font-[family-name:var(--font-heading)] opacity-20",
										children: step.num.replace("Step ", "")
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "text-3xl lg:text-5xl font-black text-slate-950 mb-6 font-[family-name:var(--font-heading)] leading-tight tracking-tight",
										children: step.title
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-lg lg:text-xl text-slate-500 leading-relaxed font-medium max-w-md",
										children: step.desc
									})
								]
							})]
						}, idx))
					})]
				})]
			}),
			/* @__PURE__ */ jsx(PremiumFooter, {})
		]
	});
}
//#endregion
//#region resources/js/Pages/Insights.tsx
var Insights_exports = /* @__PURE__ */ __exportAll({ default: () => Insights });
function Insights({ insights, smart_tips, score, generated_at, profile }) {
	const [isRegenerating, setIsRegenerating] = useState(false);
	const handleRegenerate = () => {
		setIsRegenerating(true);
		router.post(route("insights.regenerate"), {}, {
			preserveScroll: true,
			onFinish: () => setIsRegenerating(false)
		});
	};
	if (!insights) return /* @__PURE__ */ jsxs(AppLayout, {
		header: "AI Insights",
		children: [/* @__PURE__ */ jsx(Head, { title: "AI Insights" }), /* @__PURE__ */ jsx("div", {
			className: "py-12 flex justify-center text-slate-400",
			children: "Belum ada insight. Silakan analisis CV terlebih dahulu."
		})]
	});
	const { headline_insight, strength_insight, gap_insight, progress_insight, market_position, next_milestone_tip } = insights;
	return /* @__PURE__ */ jsxs(AppLayout, {
		header: "AI Career Insights",
		children: [/* @__PURE__ */ jsx(Head, { title: "AI Insights" }), /* @__PURE__ */ jsxs("div", {
			className: "py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "bg-gradient-to-r from-navy-800 to-teal-900/40 rounded-3xl p-8 border border-teal-500/20 relative overflow-hidden",
					children: /* @__PURE__ */ jsxs("div", {
						className: "relative z-10",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-3xl font-bold text-white mb-4 leading-tight",
							children: headline_insight
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-4 text-sm",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "text-teal-200/60",
								children: ["Diperbarui ", generated_at]
							}), /* @__PURE__ */ jsxs("button", {
								onClick: handleRegenerate,
								disabled: isRegenerating,
								className: "flex items-center gap-2 text-teal-300 hover:text-white transition bg-teal-500/10 px-3 py-1.5 rounded-full",
								children: [/* @__PURE__ */ jsx(RefreshCw, { className: `w-4 h-4 ${isRegenerating ? "animate-spin" : ""}` }), isRegenerating ? "Memperbarui..." : "Perbarui AI Insights"]
							})]
						})]
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 md:grid-cols-3 gap-6",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "bg-slate-800/50 rounded-2xl p-6 border border-teal-500/20",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "text-4xl mb-4",
									children: strength_insight?.emoji || "💪"
								}),
								/* @__PURE__ */ jsx("h4", {
									className: "font-bold text-teal-300 mb-2",
									children: strength_insight?.title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-slate-300 text-sm",
									children: strength_insight?.message
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: `bg-slate-800/50 rounded-2xl p-6 border ${gap_insight?.urgency === "high" ? "border-amber-500/30" : "border-slate-700"}`,
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex justify-between items-start mb-4",
									children: [/* @__PURE__ */ jsx("div", {
										className: "text-4xl",
										children: gap_insight?.emoji || "🎯"
									}), gap_insight?.urgency && /* @__PURE__ */ jsx("span", {
										className: `text-xs px-2 py-1 rounded-md font-medium ${gap_insight.urgency === "high" ? "bg-amber-500/20 text-amber-400" : "bg-slate-700 text-slate-300"}`,
										children: gap_insight.urgency.toUpperCase()
									})]
								}),
								/* @__PURE__ */ jsx("h4", {
									className: `font-bold mb-2 ${gap_insight?.urgency === "high" ? "text-amber-400" : "text-slate-200"}`,
									children: gap_insight?.title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-slate-300 text-sm",
									children: gap_insight?.message
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "bg-slate-800/50 rounded-2xl p-6 border border-blue-500/20",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "text-4xl mb-4",
									children: progress_insight?.emoji || "🚀"
								}),
								/* @__PURE__ */ jsx("h4", {
									className: "font-bold text-blue-300 mb-2",
									children: progress_insight?.title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-slate-300 text-sm",
									children: progress_insight?.message
								})
							]
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bg-slate-800/50 rounded-2xl p-6 border border-slate-700 flex items-center gap-6",
					children: [/* @__PURE__ */ jsx("div", {
						className: "p-4 bg-slate-700/50 rounded-xl text-indigo-400 shrink-0",
						children: /* @__PURE__ */ jsx(Target, { className: "w-8 h-8" })
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
						className: "text-sm text-slate-400 font-medium mb-1",
						children: "Posisimu di Pasar"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-lg text-slate-200 font-medium",
						children: market_position
					})] })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-12",
					children: [/* @__PURE__ */ jsxs("h3", {
						className: "text-xl font-bold text-slate-100 mb-6 flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(Lightbulb, { className: "text-amber-400" }), "Langkah Konkret Minggu Ini"]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-6",
						children: smart_tips.map((tip, idx) => /* @__PURE__ */ jsx("div", {
							className: "bg-slate-800/80 rounded-2xl p-6 border border-slate-700 hover:border-teal-500/30 transition",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex gap-4",
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-4xl shrink-0",
									children: tip.emoji
								}), /* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex gap-2 mb-2",
										children: [/* @__PURE__ */ jsxs("span", {
											className: "text-xs font-semibold px-2 py-0.5 rounded bg-slate-700 text-slate-300",
											children: ["Prioritas ", tip.priority]
										}), /* @__PURE__ */ jsx("span", {
											className: `text-xs font-semibold px-2 py-0.5 rounded ${tip.category === "skill" ? "bg-indigo-900/20 text-indigo-300" : tip.category === "project" ? "bg-purple-500/20 text-purple-400" : tip.category === "mindset" ? "bg-amber-500/20 text-amber-400" : "bg-teal-500/20 text-teal-400"}`,
											children: tip.category.toUpperCase()
										})]
									}),
									/* @__PURE__ */ jsx("h4", {
										className: "font-bold text-slate-100 mb-2",
										children: tip.title
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-sm text-slate-400 mb-3",
										children: tip.description
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "text-xs text-slate-500 flex items-center gap-1",
										children: ["⏱ ", tip.time_estimate]
									})
								] })]
							})
						}, idx))
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bg-navy-800 rounded-2xl p-6 border border-slate-700 mt-8 text-center flex flex-col items-center",
					children: [
						/* @__PURE__ */ jsx(Zap, { className: "w-8 h-8 text-amber-400 mb-4" }),
						/* @__PURE__ */ jsx("p", {
							className: "text-lg text-slate-200 mb-6 max-w-2xl",
							children: next_milestone_tip
						}),
						/* @__PURE__ */ jsxs("button", {
							onClick: () => router.get(route("roadmap")),
							className: "bg-teal-500 hover:bg-teal-400 text-navy-900 font-bold px-6 py-3 rounded-xl transition flex items-center gap-2",
							children: ["Buka Roadmap ", /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })]
						})
					]
				})
			]
		})]
	});
}
//#endregion
//#region resources/js/Components/ui/cta-with-text-marquee.tsx
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function VerticalMarquee({ children, pauseOnHover = false, reverse = false, className, speed = 30, onItemsRef }) {
	const containerRef = useRef(null);
	useEffect(() => {
		if (onItemsRef && containerRef.current) onItemsRef(Array.from(containerRef.current.querySelectorAll(".marquee-item")));
	}, [onItemsRef]);
	return /* @__PURE__ */ jsxs("div", {
		ref: containerRef,
		className: cn("group flex flex-col overflow-hidden", className),
		style: { "--duration": `${speed}s` },
		children: [/* @__PURE__ */ jsx("div", {
			className: cn("flex shrink-0 flex-col animate-marquee-vertical", reverse && "[animation-direction:reverse]", pauseOnHover && "group-hover:[animation-play-state:paused]"),
			children
		}), /* @__PURE__ */ jsx("div", {
			className: cn("flex shrink-0 flex-col animate-marquee-vertical", reverse && "[animation-direction:reverse]", pauseOnHover && "group-hover:[animation-play-state:paused]"),
			"aria-hidden": "true",
			children
		})]
	});
}
var marqueeItems = [
	"Software Engineer",
	"Data Scientist",
	"Product Manager",
	"UI/UX Designer",
	"System Analyst",
	"Backend Developer",
	"Frontend Developer",
	"Digital Marketer"
];
function CTAWithVerticalMarquee() {
	const marqueeRef = useRef(null);
	useEffect(() => {
		const marqueeContainer = marqueeRef.current;
		if (!marqueeContainer) return;
		const updateOpacity = () => {
			const items = marqueeContainer.querySelectorAll(".marquee-item");
			const containerRect = marqueeContainer.getBoundingClientRect();
			const centerY = containerRect.top + containerRect.height / 2;
			items.forEach((item) => {
				const itemRect = item.getBoundingClientRect();
				const itemCenterY = itemRect.top + itemRect.height / 2;
				const distance = Math.abs(centerY - itemCenterY);
				const maxDistance = containerRect.height / 2;
				const opacity = 1 - Math.min(distance / maxDistance, 1) * .75;
				item.style.opacity = opacity.toString();
			});
		};
		const animationFrame = () => {
			updateOpacity();
			requestAnimationFrame(animationFrame);
		};
		const frame = requestAnimationFrame(animationFrame);
		return () => cancelAnimationFrame(frame);
	}, []);
	return /* @__PURE__ */ jsx("section", {
		className: "bg-[#f6f6f6] py-16 md:py-24",
		children: /* @__PURE__ */ jsx("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
			children: /* @__PURE__ */ jsxs("div", {
				className: "relative bg-white rounded-[40px] px-8 py-16 sm:px-16 overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center min-h-[500px]",
				children: [
					/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" }),
					/* @__PURE__ */ jsx("div", { className: "absolute top-[0%] left-[-10%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[80px] pointer-events-none" }),
					/* @__PURE__ */ jsx("div", { className: "absolute bottom-[0%] right-[-10%] w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-[80px] pointer-events-none" }),
					/* @__PURE__ */ jsxs("div", {
						className: "relative z-20 flex flex-col lg:flex-row items-center justify-between w-full h-full gap-12",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex-1 text-center lg:text-left py-8 lg:py-0 relative z-20 max-w-xl",
							children: [
								/* @__PURE__ */ jsxs("h2", {
									className: "text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1A1A2E] font-[family-name:var(--font-heading)] leading-[1.1] mb-6 tracking-tight animate-fade-in-up",
									children: [
										"Saatnya Mulai Transformasi",
										/* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
										"Karier Anda"
									]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-4 text-slate-500 text-lg md:text-xl mb-10 font-medium leading-relaxed animate-fade-in-up",
									style: { animationDelay: "200ms" },
									children: "Dapatkan roadmap presisi secara instan, validasi portofolio cerdas, dan sinkronisasi menuju posisi idaman Anda di industri."
								}),
								/* @__PURE__ */ jsx("div", {
									className: "flex flex-wrap justify-center lg:justify-start gap-4 animate-fade-in-up",
									style: { animationDelay: "400ms" },
									children: /* @__PURE__ */ jsx(InteractiveHoverButton, {
										text: "Mulai Gratis Sekarang",
										loadingText: "Memproses...",
										successText: "Siap Melesat!",
										className: "rounded-xl shadow-[0_10px_20px_-10px_rgba(59,130,246,0.6)] hover:shadow-xl hover:shadow-primary/30 transition-all text-[18px] py-4 px-10 min-w-0",
										onClick: () => {
											setTimeout(() => {
												router.visit("/register");
											}, 2e3);
										}
									})
								})
							]
						}), /* @__PURE__ */ jsx("div", {
							className: "relative flex-1 h-[400px] lg:h-[550px] w-full flex items-center justify-center animate-fade-in-up",
							style: { animationDelay: "600ms" },
							children: /* @__PURE__ */ jsxs("div", {
								ref: marqueeRef,
								className: "relative w-full h-full overflow-hidden z-20",
								children: [
									/* @__PURE__ */ jsx(VerticalMarquee, {
										speed: 30,
										className: "h-full items-center",
										children: marqueeItems.map((item, idx) => /* @__PURE__ */ jsx("div", {
											className: "text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight py-6 marquee-item text-center w-full",
											children: item
										}, idx))
									}),
									/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-white/70 to-transparent z-30" }),
									/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/70 to-transparent z-30" })
								]
							})
						})]
					})
				]
			})
		})
	});
}
//#endregion
//#region resources/js/Components/ui/container-scroll-animation.tsx
var ContainerScroll = ({ titleComponent, children }) => {
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({ target: containerRef });
	const [isMobile, setIsMobile] = React.useState(false);
	React.useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => {
			window.removeEventListener("resize", checkMobile);
		};
	}, []);
	const scaleDimensions = () => {
		return isMobile ? [.7, .9] : [1.05, 1];
	};
	const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
	const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
	const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);
	return /* @__PURE__ */ jsx("div", {
		className: "h-[40rem] md:h-[80rem] flex items-start justify-center relative p-2 md:px-20 md:pt-2 md:pb-10",
		ref: containerRef,
		children: /* @__PURE__ */ jsxs("div", {
			className: "py-2 md:py-4 w-full relative",
			style: { perspective: "1000px" },
			children: [/* @__PURE__ */ jsx(Header, {
				translate,
				titleComponent
			}), /* @__PURE__ */ jsx(Card, {
				rotate,
				translate,
				scale,
				children
			})]
		})
	});
};
var Header = ({ translate, titleComponent }) => {
	return /* @__PURE__ */ jsx(motion.div, {
		style: { translateY: translate },
		className: "div max-w-5xl mx-auto text-center",
		children: titleComponent
	});
};
var Card = ({ rotate, scale, children }) => {
	return /* @__PURE__ */ jsx(motion.div, {
		style: {
			rotateX: rotate,
			scale,
			boxShadow: "0 10px 25px -5px #3b82f626, 0 8px 10px -6px #3b82f61a"
		},
		className: "max-w-5xl -mt-12 mx-auto h-fit w-full border border-white p-2 md:p-6 bg-white/40 backdrop-blur-md rounded-[30px] shadow-xl",
		children: /* @__PURE__ */ jsx("div", {
			className: "h-auto w-full overflow-hidden rounded-2xl bg-transparent",
			children
		})
	});
};
//#endregion
//#region resources/js/Pages/Landing.tsx
var Landing_exports = /* @__PURE__ */ __exportAll({ default: () => Landing });
function Hero() {
	return /* @__PURE__ */ jsxs("section", {
		className: "relative overflow-hidden bg-[#f6f6f6] pt-4 pb-4 md:pt-6 md:pb-2",
		children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-40" }), /* @__PURE__ */ jsx("div", {
			className: "flex flex-col overflow-hidden",
			children: /* @__PURE__ */ jsx(ContainerScroll, {
				titleComponent: /* @__PURE__ */ jsxs("div", {
					className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "inline-flex items-center gap-2.5 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 text-[13px] font-semibold text-accent mb-8 hover:bg-accent/15 transition-colors cursor-default",
							children: "AI-Powered Skill Gap Analysis v2.0"
						}),
						/* @__PURE__ */ jsxs("h1", {
							className: "text-[60px] font-extrabold text-slate-900 leading-[66px] tracking-tight font-[family-name:var(--font-heading)]",
							children: [
								"Kembangkan Potensimu.",
								/* @__PURE__ */ jsx("br", {}),
								/* @__PURE__ */ jsx("span", {
									className: "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
									children: "Sinkronkan dengan Industri."
								})
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-6 text-slate-600 text-[15px] font-medium sm:text-[18px] max-w-2xl mx-auto leading-relaxed",
							children: "Platform pembelajaran adaptif yang mempersonalisasi alur belajar Anda melalui identifikasi skill-gap berbasis kecerdasan buatan."
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-10 flex flex-col sm:flex-row items-center justify-center gap-4",
							children: /* @__PURE__ */ jsx(InteractiveHoverButton, {
								text: "Mulai Analisis CV",
								className: "rounded-lg shadow-xl shadow-primary/20 text-[16px] px-8 py-3.5 min-w-0",
								onClick: () => {
									setTimeout(() => {
										router.visit("/register");
									}, 1e3);
								}
							})
						})
					]
				}),
				children: /* @__PURE__ */ jsxs("div", {
					className: "relative h-full w-full group",
					children: [/* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-primary/10 rounded-[2rem] blur-3xl opacity-30" }), /* @__PURE__ */ jsx("div", {
						className: "relative h-full bg-slate-100 rounded-2xl overflow-hidden p-2 md:p-3 shadow-2xl",
						children: /* @__PURE__ */ jsx("img", {
							src: "/Dashboard View.png",
							alt: "Kembangin Dashboard Preview",
							className: "w-full h-auto rounded-xl shadow-sm"
						})
					})]
				})
			})
		})]
	});
}
function Features() {
	return /* @__PURE__ */ jsx("section", {
		id: "features",
		className: "bg-[#f6f6f6] pt-10 pb-20 md:pt-16 md:pb-28",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "text-center max-w-2xl mx-auto mb-16",
				children: [/* @__PURE__ */ jsx("div", {
					className: "inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-semibold mb-5",
					children: "Fitur Utama"
				}), /* @__PURE__ */ jsx("h2", {
					className: "text-3xl sm:text-[48px] font-extrabold text-[#1A1A2E] font-[family-name:var(--font-heading)] leading-tight",
					children: "Empat Pilar Transformasi Karier Digital Anda."
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-8",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "bg-white rounded-[24px] p-2 transition-all duration-300 group",
						children: [/* @__PURE__ */ jsx("div", {
							className: "bg-[#f6f6f6] rounded-[20px] mb-6 h-[280px] overflow-hidden flex flex-col items-center justify-center p-6 relative",
							children: /* @__PURE__ */ jsxs("div", {
								className: "absolute inset-x-8 top-10 bottom-0 bg-white rounded-t-2xl p-6 border-b-0 transition-transform duration-500 group-hover:-translate-y-2",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4 mb-6 pb-4 border-b border-slate-100",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center ring-4 ring-white ",
											children: /* @__PURE__ */ jsx("svg", {
												className: "w-6 h-6",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												viewBox: "0 0 24 24",
												children: /* @__PURE__ */ jsx("path", {
													strokeLinecap: "round",
													strokeLinejoin: "round",
													d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
												})
											})
										}),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
											className: "text-[12px] text-slate-500 font-medium mb-0.5 uppercase tracking-wider",
											children: "Target Karier"
										}), /* @__PURE__ */ jsx("div", {
											className: "text-base font-bold text-slate-900 leading-tight",
											children: "Full Stack Developer"
										})] }),
										/* @__PURE__ */ jsxs("div", {
											className: "ml-auto text-right",
											children: [/* @__PURE__ */ jsx("div", {
												className: "text-[12px] text-slate-500 font-medium mb-0.5 uppercase tracking-wider",
												children: "Kecocokan"
											}), /* @__PURE__ */ jsx("div", {
												className: "text-lg font-black text-primary",
												children: "82%"
											})]
										})
									]
								}), /* @__PURE__ */ jsx("div", {
									className: "space-y-4",
									children: [
										{
											skill: "Laravel Framework",
											status: "Dikuasai",
											icon: "✓",
											color: "text-emerald-500",
											bg: "bg-emerald-50"
										},
										{
											skill: "React / Inertia.js",
											status: "Dikuasai",
											icon: "✓",
											color: "text-emerald-500",
											bg: "bg-emerald-50"
										},
										{
											skill: "Docker & CI/CD",
											status: "Kesenjangan",
											icon: "×",
											color: "text-rose-500",
											bg: "bg-rose-50"
										}
									].map((s, idx) => /* @__PURE__ */ jsxs("div", {
										className: "flex justify-between items-center bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ jsx("div", {
												className: `w-6 h-6 flex items-center justify-center rounded-md ${s.bg} ${s.color} font-bold text-sm`,
												children: s.icon
											}), /* @__PURE__ */ jsx("span", {
												className: "font-semibold text-slate-700 text-sm",
												children: s.skill
											})]
										}), /* @__PURE__ */ jsx("span", {
											className: `text-xs font-bold ${s.color}`,
											children: s.status
										})]
									}, idx))
								})]
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: "px-6 pb-8 pt-2",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "text-2xl font-bold text-slate-900 mb-3 font-[family-name:var(--font-heading)]",
								children: "Diagnostic Assessment & Skill-Gap Profiling"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-[16px] text-slate-500 leading-relaxed font-medium",
								children: "Gunakan AI untuk mengekstrak kompetensi dari CV Anda dan bandingkan langsung dengan standar industri terkini untuk mengkalkulasi celah keahlian secara presisi."
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "bg-white rounded-[24px] p-2 transition-all duration-300 group",
						children: [/* @__PURE__ */ jsx("div", {
							className: "bg-[#f6f6f6] rounded-[20px] mb-6 h-[280px] overflow-hidden flex flex-col items-center justify-center p-6 relative",
							children: /* @__PURE__ */ jsx("div", {
								className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[280px] transition-transform duration-500 group-hover:scale-105",
								children: /* @__PURE__ */ jsxs("div", {
									className: "bg-white px-5 py-5 rounded-2xl border border-slate-100",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "text-sm font-bold text-slate-800 mb-4 border-b border-slate-100 pb-3 flex items-center justify-between",
										children: ["Roadmap Belajar ", /* @__PURE__ */ jsx("span", {
											className: "bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-md",
											children: "8/12 Modul"
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "relative border-l-2 border-slate-200 ml-2 space-y-5",
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "relative",
												children: [/* @__PURE__ */ jsx("div", {
													className: "absolute -left-[25px] bg-emerald-500 w-5 h-5 rounded-full border-4 border-white flex items-center justify-center",
													children: /* @__PURE__ */ jsx("svg", {
														className: "w-2.5 h-2.5 text-white",
														fill: "none",
														stroke: "currentColor",
														strokeWidth: "3",
														viewBox: "0 0 24 24",
														children: /* @__PURE__ */ jsx("path", {
															strokeLinecap: "round",
															strokeLinejoin: "round",
															d: "M5 13l4 4L19 7"
														})
													})
												}), /* @__PURE__ */ jsxs("div", {
													className: "pl-6",
													children: [/* @__PURE__ */ jsx("div", {
														className: "text-xs font-bold text-slate-800",
														children: "Modul 8: Backend Laravel"
													}), /* @__PURE__ */ jsx("div", {
														className: "text-[11px] text-slate-500 font-medium",
														children: "Selesai • 100 XP"
													})]
												})]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "relative",
												children: [/* @__PURE__ */ jsx("div", { className: "absolute -left-[25px] bg-primary w-5 h-5 rounded-full border-4 border-white " }), /* @__PURE__ */ jsxs("div", {
													className: "pl-6",
													children: [/* @__PURE__ */ jsx("div", {
														className: "text-xs font-bold text-primary",
														children: "Modul 9: API & JWT Auth"
													}), /* @__PURE__ */ jsx("div", {
														className: "text-[11px] font-medium text-primary bg-primary/10 inline-block px-2 py-0.5 rounded mt-1",
														children: "Sedang Berjalan"
													})]
												})]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "relative",
												children: [/* @__PURE__ */ jsx("div", { className: "absolute -left-[25px] bg-slate-200 w-5 h-5 rounded-full border-4 border-white" }), /* @__PURE__ */ jsxs("div", {
													className: "pl-6",
													children: [/* @__PURE__ */ jsx("div", {
														className: "flex items-center gap-1.5",
														children: /* @__PURE__ */ jsx("span", {
															className: "text-xs font-bold text-slate-400",
															children: "Capstone Project"
														})
													}), /* @__PURE__ */ jsx("div", {
														className: "text-[11px] text-slate-400 font-medium",
														children: "Terkunci"
													})]
												})]
											})
										]
									})]
								})
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: "px-6 pb-8 pt-2",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "text-2xl font-bold text-slate-900 mb-3 font-[family-name:var(--font-heading)]",
								children: "Personalized Learning Path"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-[16px] text-slate-500 leading-relaxed font-medium",
								children: "Dapatkan alur belajar adaptif yang dipersonalisasi serta kewajiban pengerjaan Capstone Project yang divalidasi otomatis."
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "bg-white rounded-[24px] p-2 transition-all duration-300 group",
						children: [/* @__PURE__ */ jsx("div", {
							className: "bg-[#f6f6f6] rounded-[20px] mb-6 h-[280px] overflow-hidden flex flex-col items-center justify-center p-6 relative",
							children: /* @__PURE__ */ jsxs("div", {
								className: "w-full max-w-[320px] space-y-3 transition-transform duration-500 group-hover:-translate-y-2",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center justify-between",
									children: [/* @__PURE__ */ jsx("span", { children: "Market Insights" }), /* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" }), " Live API"]
									})]
								}), [
									{
										name: "PostgreSQL",
										val: "12.4k",
										color: "text-blue-600",
										bg: "bg-blue-100"
									},
									{
										name: "TypeScript",
										val: "9.8k",
										color: "text-indigo-600",
										bg: "bg-indigo-100"
									},
									{
										name: "Tailwind CSS",
										val: "8.2k",
										color: "text-cyan-600",
										bg: "bg-cyan-100"
									}
								].map((item, i) => /* @__PURE__ */ jsxs("div", {
									className: "bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-4",
										children: [/* @__PURE__ */ jsx("div", {
											className: `w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`,
											children: /* @__PURE__ */ jsx(TrendingUp, { className: `w-4 h-4 ${item.color}` })
										}), /* @__PURE__ */ jsx("div", {
											className: "text-[14px] font-bold text-slate-800",
											children: item.name
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "text-[12px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md",
										children: [item.val, " Job"]
									})]
								}, i))]
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: "px-6 pb-8 pt-2",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "text-2xl font-bold text-slate-900 mb-3 font-[family-name:var(--font-heading)]",
								children: "Dynamic Curriculum Synchronization"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-[16px] text-slate-500 leading-relaxed font-medium",
								children: "Sistem mengekstraksi data kebutuhan industri secara otomatis sebagai sensor untuk mengidentifikasi Trending Skills secara real-time."
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "bg-white rounded-[24px] p-2 transition-all duration-300 group",
						children: [/* @__PURE__ */ jsx("div", {
							className: "bg-[#f6f6f6] rounded-[20px] mb-6 h-[280px] overflow-hidden flex align-center justify-center p-6 relative",
							children: /* @__PURE__ */ jsx("div", {
								className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] transition-transform duration-500 group-hover:scale-105",
								children: /* @__PURE__ */ jsxs("div", {
									className: "bg-white p-8 rounded-[32px] border border-slate-100",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "text-center mb-6",
										children: [/* @__PURE__ */ jsx("div", {
											className: "text-[13px] text-slate-500 font-medium mb-3 uppercase tracking-wider",
											children: "Readiness Score"
										}), /* @__PURE__ */ jsxs("div", {
											className: "relative inline-flex items-center justify-center",
											children: [/* @__PURE__ */ jsxs("svg", {
												className: "w-28 h-28 transform -rotate-90",
												children: [/* @__PURE__ */ jsx("circle", {
													cx: "56",
													cy: "56",
													r: "46",
													stroke: "currentColor",
													strokeWidth: "8",
													fill: "transparent",
													className: "text-slate-100"
												}), /* @__PURE__ */ jsx("circle", {
													cx: "56",
													cy: "56",
													r: "46",
													stroke: "#3b82f6",
													strokeWidth: "8",
													fill: "transparent",
													strokeDasharray: "289",
													strokeDashoffset: "43",
													className: "text-primary rounded-full transition-all duration-1000"
												})]
											}), /* @__PURE__ */ jsx("div", {
												className: "absolute flex flex-col items-center",
												children: /* @__PURE__ */ jsxs("div", {
													className: "text-3xl font-extrabold tracking-tight text-slate-900",
													children: ["85", /* @__PURE__ */ jsx("span", {
														className: "text-xl text-slate-400 font-normal",
														children: "%"
													})]
												})
											})]
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-center gap-3",
										children: [/* @__PURE__ */ jsx("div", {
											className: "w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-20",
											children: /* @__PURE__ */ jsx(Trophy, { className: "w-5 h-5 text-amber-600" })
										}), /* @__PURE__ */ jsx("div", {
											className: "w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10",
											children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 text-emerald-600" })
										})]
									})]
								})
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: "px-6 pb-8 pt-2",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "text-2xl font-bold text-slate-900 mb-3 font-[family-name:var(--font-heading)]",
								children: "Learning Outcomes & Engagement"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-[16px] text-slate-500 leading-relaxed font-medium",
								children: "Validasi hasil belajar melalui Job Readiness Score (0-100%) dan portofolio publik yang didukung sistem gamifikasi."
							})]
						})]
					})
				]
			})]
		})
	});
}
function Benefits() {
	return /* @__PURE__ */ jsx("section", {
		id: "benefits",
		className: "bg-[#f6f6f6] py-20 md:py-28",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "text-center max-w-3xl mx-auto mb-16",
				children: [/* @__PURE__ */ jsx("div", {
					className: "inline-flex items-center gap-2 border border-primary/30 text-primary rounded-full px-5 py-1.5 text-sm font-semibold mb-6 bg-white/50 backdrop-blur-sm",
					children: "Kenapa Kembangin?"
				}), /* @__PURE__ */ jsx("h2", {
					className: "text-4xl md:text-[46px] font-extrabold text-[#1A1A2E] leading-tight mb-6",
					children: "Cara Lebih Cerdas Membangun Karier Digital"
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "bg-white rounded-[32px] p-2 sm:p-4 shadow-sm border border-slate-200",
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "p-8",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-2xl font-bold mb-6",
							children: "Platform Lain"
						}), /* @__PURE__ */ jsx("ul", {
							className: "space-y-4",
							children: [
								"Pembelajaran tidak terarah & generik",
								"Sulit mengetahui skill apa yang sedang dicari HRD",
								"Tidak ada bukti riil penguasaan kompetensi",
								"Kurikulum sering tertinggal",
								"Fokus hanya pada teori"
							].map((t, i) => /* @__PURE__ */ jsxs("li", {
								className: "flex items-center gap-3 text-slate-500",
								children: [/* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-slate-300" }), t]
							}, i))
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "p-8 rounded-[28px] bg-primary/5 border-2 border-primary/20",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-2xl font-bold mb-6 text-primary",
							children: "Kembangin"
						}), /* @__PURE__ */ jsx("ul", {
							className: "space-y-4",
							children: [
								"Roadmap belajar terpersonalisasi oleh AI",
								"Diagnosis skill-gap presisi industri",
								"Portofolio divalidasi via GitHub",
								"Sinkronisasi kurikulum real-time",
								"Job Readiness Score terukur"
							].map((t, i) => /* @__PURE__ */ jsxs("li", {
								className: "flex items-center gap-3 text-slate-700 font-bold",
								children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-primary" }), t]
							}, i))
						})]
					})]
				})
			})]
		})
	});
}
function HowItWorks() {
	return /* @__PURE__ */ jsx("section", {
		id: "how-it-works",
		className: "bg-[#f6f6 f6] py-24 md:py-32 overflow-hidden",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "text-center max-w-3xl mx-auto mb-20",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "inline-flex items-center gap-2 bg-primary/5 text-primary rounded-full px-5 py-1.5 text-xs font-bold mb-6 border border-primary/10",
							children: "How It Works"
						}),
						/* @__PURE__ */ jsxs("h2", {
							className: "text-4xl md:text-[56px] font-bold text-slate-950 leading-tight mb-6 tracking-tight",
							children: [
								"Wujudkan Karier Impian",
								/* @__PURE__ */ jsx("br", {}),
								"Dalam 3 Langkah Mudah"
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-slate-500 text-lg sm:text-xl font-medium leading-relaxed max-w-2xl mx-auto",
							children: "Sistem cerdas kami membimbing Anda dari tahap awal hingga siap kerja di industri."
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 md:grid-cols-3 gap-8",
					children: [
						{
							title: "Diagnosis AI & Profiling",
							desc: "AI memindai CV Anda untuk mengekstrak kompetensi dan membandingkannya dengan standar industri.",
							visual: /* @__PURE__ */ jsxs("div", {
								className: "relative w-full h-48 mt-8 flex items-center justify-center overflow-hidden",
								children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl" }), /* @__PURE__ */ jsxs("div", {
									className: "relative flex items-center justify-center",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "w-32 h-32 bg-white rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center relative z-10",
											children: /* @__PURE__ */ jsx(Upload, { className: "w-12 h-12 text-primary" })
										}),
										/* @__PURE__ */ jsx("div", {
											className: "absolute -right-8 -top-4 w-16 h-16 bg-blue-50 rounded-xl shadow-lg border border-blue-100 flex items-center justify-center z-20 rotate-12",
											children: /* @__PURE__ */ jsx(FileSearch, { className: "w-8 h-8 text-blue-500" })
										}),
										/* @__PURE__ */ jsx("div", { className: "absolute w-48 h-48 border border-primary/10 rounded-full" })
									]
								})]
							})
						},
						{
							title: "Personalized Roadmap",
							desc: "Dapatkan alur belajar adaptif yang dirancang khusus untuk menutup gap kompetensi Anda.",
							visual: /* @__PURE__ */ jsx("div", {
								className: "relative w-full h-48 mt-8 flex items-center justify-center overflow-hidden",
								children: /* @__PURE__ */ jsxs("div", {
									className: "w-full max-w-[200px] bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-inner",
									children: [/* @__PURE__ */ jsx("div", {
										className: "h-2 w-full bg-slate-200 rounded-full mb-4 overflow-hidden",
										children: /* @__PURE__ */ jsx("div", { className: "h-full bg-primary w-2/3" })
									}), /* @__PURE__ */ jsxs("div", {
										className: "space-y-3",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "h-8 w-full bg-white rounded-lg border border-slate-100 flex items-center px-2 gap-2",
											children: [/* @__PURE__ */ jsx("div", {
												className: "w-4 h-4 rounded bg-emerald-500 flex items-center justify-center",
												children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-2.5 h-2.5 text-white" })
											}), /* @__PURE__ */ jsx("div", { className: "h-2 w-16 bg-slate-100 rounded" })]
										}), /* @__PURE__ */ jsxs("div", {
											className: "h-8 w-full bg-white rounded-lg border border-primary/20 flex items-center px-2 gap-2 shadow-sm",
											children: [/* @__PURE__ */ jsx("div", { className: "w-4 h-4 rounded bg-primary" }), /* @__PURE__ */ jsx("div", { className: "h-2 w-20 bg-primary/10 rounded" })]
										})]
									})]
								})
							})
						},
						{
							title: "Job Readiness & Karier",
							desc: "Validasi hasil belajar melalui proyek riil dan dapatkan bukti kesiapan kerja yang diakui industri.",
							visual: /* @__PURE__ */ jsx("div", {
								className: "relative w-full h-48 mt-8 flex items-center justify-center",
								children: /* @__PURE__ */ jsxs("div", {
									className: "relative w-36 h-36",
									children: [/* @__PURE__ */ jsxs("svg", {
										className: "w-full h-full transform -rotate-90",
										children: [/* @__PURE__ */ jsx("circle", {
											cx: "72",
											cy: "72",
											r: "60",
											stroke: "currentColor",
											strokeWidth: "10",
											fill: "transparent",
											className: "text-slate-100"
										}), /* @__PURE__ */ jsx("circle", {
											cx: "72",
											cy: "72",
											r: "60",
											stroke: "#3b82f6",
											strokeWidth: "10",
											fill: "transparent",
											strokeDasharray: "377",
											strokeDashoffset: "56",
											strokeLinecap: "round"
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "absolute inset-0 flex flex-col items-center justify-center",
										children: [/* @__PURE__ */ jsx("div", {
											className: "text-2xl font-black text-slate-900",
											children: "85%"
										}), /* @__PURE__ */ jsx("div", {
											className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest",
											children: "Ready"
										})]
									})]
								})
							})
						}
					].map((step, idx) => /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 30
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: { delay: idx * .1 },
						className: "bg-[#F8FAFC] border border-slate-100 rounded-[32px] p-8 lg:p-10 flex flex-col items-center text-center group hover:bg-white hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500",
						children: [
							/* @__PURE__ */ jsx("h3", {
								className: "text-2xl font-bold text-slate-950 mb-3",
								children: step.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-slate-500 font-medium leading-relaxed",
								children: step.desc
							}),
							step.visual
						]
					}, idx))
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-20 text-center",
					children: /* @__PURE__ */ jsxs(Link, {
						href: "/how-it-works",
						className: "inline-flex items-center gap-2 bg-white border-2 border-slate-200 text-slate-600 hover:border-primary hover:text-primary px-8 py-4 rounded-2xl font-bold transition-all shadow-sm hover:shadow-xl hover:shadow-primary/10",
						children: ["Pelajari Selengkapnya ", /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" })]
					})
				})
			]
		})
	});
}
function Footer() {
	return /* @__PURE__ */ jsxs("footer", {
		className: "bg-slate-950 text-slate-400 border-t border-slate-900 pt-24 pb-12 overflow-hidden relative",
		children: [
			/* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" }),
			/* @__PURE__ */ jsx("div", { className: "absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-primary/10 blur-[100px] rounded-full pointer-events-none" }),
			/* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto px-6 lg:px-8",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-20",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "lg:col-span-1",
							children: [
								/* @__PURE__ */ jsxs(Link, {
									href: "/",
									className: "flex items-center gap-3 mb-8",
									children: [/* @__PURE__ */ jsx("div", {
										className: "w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20",
										children: /* @__PURE__ */ jsx("img", {
											src: "/logo1.svg",
											alt: "Logo",
											className: "w-6 h-6 object-contain invert brightness-0"
										})
									}), /* @__PURE__ */ jsx("span", {
										className: "text-2xl font-bold text-white tracking-tight font-[family-name:var(--font-heading)]",
										children: "Kembangin"
									})]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-base leading-relaxed mb-8 max-w-sm text-slate-400 font-medium",
									children: "Solusi cerdas berbasis AI untuk mengakselerasi karier digital Anda dengan menjembatani kesenjangan antara pendidikan dan industri."
								}),
								/* @__PURE__ */ jsx("div", {
									className: "flex items-center gap-4",
									children: [
										{
											icon: Send,
											href: "#",
											label: "Twitter"
										},
										{
											icon: Briefcase,
											href: "#",
											label: "LinkedIn"
										},
										{
											icon: Cpu,
											href: "#",
											label: "GitHub"
										},
										{
											icon: Camera,
											href: "#",
											label: "Instagram"
										}
									].map((social, i) => /* @__PURE__ */ jsx("a", {
										href: social.href,
										className: "w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary/20 hover:border-primary/50 transition-all duration-300",
										children: /* @__PURE__ */ jsx(social.icon, { className: "w-5 h-5" })
									}, i))
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
							className: "text-white font-bold text-xl mb-8 font-[family-name:var(--font-heading)]",
							children: "Produk"
						}), /* @__PURE__ */ jsx("ul", {
							className: "space-y-4",
							children: [
								{
									name: "Fitur Utama",
									href: "#features"
								},
								{
									name: "Cara Kerja",
									href: "#how-it-works"
								},
								{
									name: "Market Insights",
									href: "/market"
								},
								{
									name: "Skill Assessment",
									href: "/assessment"
								}
							].map((link, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
								href: link.href,
								className: "text-base hover:text-white transition-colors duration-200 flex items-center group",
								children: [/* @__PURE__ */ jsx("div", { className: "w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100" }), link.name]
							}) }, i))
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
							className: "text-white font-bold text-xl mb-8 font-[family-name:var(--font-heading)]",
							children: "Sumber"
						}), /* @__PURE__ */ jsx("ul", {
							className: "space-y-4",
							children: [
								{
									name: "Blog Karier",
									href: "/blog"
								},
								{
									name: "Dokumentasi",
									href: "/docs"
								},
								{
									name: "FAQ",
									href: "/faq"
								}
							].map((link, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
								href: link.href,
								className: "text-base hover:text-white transition-colors duration-200 flex items-center group",
								children: [/* @__PURE__ */ jsx("div", { className: "w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100" }), link.name]
							}) }, i))
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("h4", {
								className: "text-white font-bold text-xl mb-8 font-[family-name:var(--font-heading)]",
								children: "Tetap Terhubung"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-base mb-6 text-slate-500 font-medium",
								children: "Dapatkan update terbaru mengenai tren industri."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("input", {
									type: "email",
									placeholder: "Email Anda",
									className: "w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-sm focus:border-primary/50 text-white transition-all"
								}), /* @__PURE__ */ jsx("button", {
									className: "absolute right-1 top-1 bg-primary text-white p-2 rounded-lg shadow-lg shadow-primary/20",
									children: /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
								})]
							})
						] })
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "text-sm font-medium",
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" Kembangin. Seluruh hak cipta dilindungi."
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 px-4 py-1.5 bg-slate-900 rounded-full border border-slate-800 text-xs font-bold text-slate-500",
						children: [/* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }), "SDG 4 & SDG 8 COMPLIANT"]
					})]
				})]
			})
		]
	});
}
function Landing({ stats }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-[#f6f6f6] text-[#1A1A2E]",
		children: [
			/* @__PURE__ */ jsx(Head, { title: "Kembangin — AI-Powered Career Intelligence" }),
			/* @__PURE__ */ jsx(Navbar, {}),
			/* @__PURE__ */ jsx(Hero, {}),
			/* @__PURE__ */ jsx(Features, {}),
			/* @__PURE__ */ jsx(Benefits, {}),
			/* @__PURE__ */ jsx(HowItWorks, {}),
			/* @__PURE__ */ jsx(CTAWithVerticalMarquee, {}),
			/* @__PURE__ */ jsx(Footer, {})
		]
	});
}
//#endregion
//#region resources/js/Pages/Leaderboard.tsx
var Leaderboard_exports = /* @__PURE__ */ __exportAll({ default: () => Leaderboard });
function Leaderboard({ leaders, current_user_rank, user_opted_in }) {
	const handleToggleOptIn = () => {
		router.post(route("leaderboard.opt-in"), {}, { preserveScroll: true });
	};
	const getRankColor = (rank) => {
		switch (rank) {
			case "Elite": return "text-purple-400";
			case "Expert": return "text-amber-400";
			case "Practitioner": return "text-blue-400";
			case "Developer": return "text-teal-400";
			default: return "text-slate-400";
		}
	};
	return /* @__PURE__ */ jsxs(AppLayout, { children: [/* @__PURE__ */ jsx(Head, { title: "Leaderboard" }), /* @__PURE__ */ jsxs("div", {
		className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "relative overflow-hidden rounded-lg bg-indigo-900 text-white shadow-2xl",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "absolute inset-0 opacity-10",
					children: [/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-20 -mt-20 blur-3xl" }), /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-64 h-64 bg-indigo-400 rounded-full -ml-20 -mb-20 blur-3xl" })]
				}), /* @__PURE__ */ jsxs("div", {
					className: "relative z-10 flex flex-col md:flex-row justify-between items-center p-8 md:p-10 gap-8",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "text-center md:text-left",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-black mb-4",
								children: [/* @__PURE__ */ jsx(Trophy, { className: "w-3 h-3 text-amber-400" }), "Talent Competition"]
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "text-3xl md:text-4xl font-black tracking-tight mb-2",
								children: "Top Talent Indonesia"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-indigo-100/70 text-sm max-w-md font-medium",
								children: "Peringkat talenta terbaik berdasarkan pengumpulan badge dan Work Readiness Score standar industri."
							})
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "flex flex-col items-center md:items-end gap-4",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-8",
							children: [user_opted_in && current_user_rank && /* @__PURE__ */ jsxs("div", {
								className: "text-center md:text-right border-r border-white/10 pr-8",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-[10px] font-bold text-indigo-300 mb-1",
									children: "Peringkat Kamu"
								}), /* @__PURE__ */ jsxs("p", {
									className: "text-4xl font-black text-white",
									children: ["#", current_user_rank]
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "text-center md:text-right",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-[10px] font-bold text-indigo-300 mb-1",
									children: "Status Visibilitas"
								}), /* @__PURE__ */ jsxs("label", {
									className: "relative inline-flex items-center cursor-pointer",
									children: [
										/* @__PURE__ */ jsx("input", {
											type: "checkbox",
											checked: !user_opted_in,
											onChange: handleToggleOptIn,
											className: "sr-only peer"
										}),
										/* @__PURE__ */ jsx("div", { className: "w-11 h-6 bg-indigo-800 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500" }),
										/* @__PURE__ */ jsx("span", {
											className: "ml-3 text-xs font-black text-indigo-100",
											children: user_opted_in ? "Public" : "Incognito"
										})
									]
								})]
							})]
						})
					})]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex flex-col sm:flex-row justify-center items-end gap-0 sm:gap-4 md:gap-8 pt-10 pb-4 px-4 overflow-x-auto sm:overflow-x-visible no-scrollbar",
				children: [
					1,
					0,
					2
				].map((idx) => {
					const leader = leaders[idx];
					if (!leader) return null;
					const isFirst = idx === 0;
					const isSecond = idx === 1;
					return /* @__PURE__ */ jsxs("div", {
						className: `flex flex-col items-center flex-shrink-0 sm:flex-shrink w-64 sm:w-1/3 max-w-[260px] group transition-all duration-500 ${isFirst ? "z-10 -mb-2" : "z-0"}`,
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "relative mb-6",
								children: [/* @__PURE__ */ jsxs("div", {
									className: `w-20 h-20 rounded-full p-1 bg-white shadow-2xl flex items-center justify-center text-2xl font-black relative z-10 border-4 ${isFirst ? "border-amber-400 w-24 h-24 text-3xl" : isSecond ? "border-slate-300" : "border-amber-700"}`,
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-slate-800",
										children: leader.name.charAt(0)
									}), /* @__PURE__ */ jsx("div", {
										className: "absolute -bottom-2 -right-2 flex -space-x-2",
										children: leader.top_badges?.slice(0, 2).map((b, i) => /* @__PURE__ */ jsx("div", {
											className: "w-8 h-8 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-sm",
											title: b.name,
											children: b.emoji
										}, i))
									})]
								}), isFirst && /* @__PURE__ */ jsx("div", {
									className: "absolute -top-8 left-1/2 -translate-x-1/2 text-amber-400 drop-shadow-lg animate-bounce",
									children: /* @__PURE__ */ jsx(Trophy, { className: "w-8 h-8 fill-amber-400" })
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "text-center mb-4",
								children: [/* @__PURE__ */ jsx("h4", {
									className: `font-black tracking-tight ${isFirst ? "text-xl" : "text-lg"} text-slate-900 line-clamp-1`,
									children: leader.name
								}), /* @__PURE__ */ jsx("p", {
									className: `text-[10px] font-black ${getRankColor(leader.rank)}`,
									children: leader.rank
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: `w-full rounded-lg shadow-xl transition-all duration-500 group-hover:-translate-y-2 flex flex-col items-center justify-start pt-8 pb-10 border-b-8
                                    ${isFirst ? "h-64 bg-white border-amber-400" : isSecond ? "h-52 bg-white/80 border-slate-300" : "h-44 bg-white/60 border-amber-700"}`,
								children: [
									/* @__PURE__ */ jsx("div", {
										className: `text-6xl font-black mb-4 opacity-5 ${isFirst ? "text-amber-500" : isSecond ? "text-slate-500" : "text-amber-900"}`,
										children: idx + 1
									}),
									/* @__PURE__ */ jsx("div", {
										className: "text-3xl font-black text-slate-900 leading-none",
										children: leader.total_points.toLocaleString()
									}),
									/* @__PURE__ */ jsx("div", {
										className: "text-[10px] font-black text-slate-400 mt-2",
										children: "Points Total"
									}),
									/* @__PURE__ */ jsxs("div", {
										className: `mt-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black ${leader.score >= 80 ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-slate-100 text-slate-600"}`,
										children: ["Score: ", leader.score || 0]
									})
								]
							})
						]
					}, leader.id);
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "px-6 py-4 border-b border-slate-50 flex items-center justify-between",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "text-sm font-black text-slate-900",
						children: "Ranking List"
					}), /* @__PURE__ */ jsxs("span", {
						className: "text-[10px] font-bold text-slate-400",
						children: [leaders.length, " Talenta Terdaftar"]
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full text-left border-collapse",
						children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
							className: "bg-slate-50 text-slate-400 text-[10px] font-black",
							children: [
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-4 w-20 text-center",
									children: "Rank"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-4",
									children: "Talent Profile"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-4 hidden md:table-cell",
									children: "Target Karir"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-4 text-center",
									children: "Achievements"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-4 text-center",
									children: "Readiness"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-4 text-right",
									children: "Points"
								})
							]
						}) }), /* @__PURE__ */ jsxs("tbody", {
							className: "divide-y divide-slate-50",
							children: [leaders.map((leader, idx) => {
								const isMe = leader.is_current_user;
								const rank = idx + 1;
								return /* @__PURE__ */ jsxs("tr", {
									className: `group transition-all hover:bg-slate-50/50 ${isMe ? "bg-indigo-50/30" : ""}`,
									children: [
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-5",
											children: /* @__PURE__ */ jsx("div", {
												className: "flex justify-center",
												children: rank === 1 ? /* @__PURE__ */ jsx("div", {
													className: "w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-black text-xs border border-amber-200",
													children: "1"
												}) : rank === 2 ? /* @__PURE__ */ jsx("div", {
													className: "w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-black text-xs border border-slate-200",
													children: "2"
												}) : rank === 3 ? /* @__PURE__ */ jsx("div", {
													className: "w-8 h-8 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center font-black text-xs border border-amber-100",
													children: "3"
												}) : /* @__PURE__ */ jsxs("span", {
													className: "font-bold text-slate-400 text-sm",
													children: ["#", rank]
												})
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-5",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ jsx("div", {
													className: "w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center font-black text-slate-700 text-sm group-hover:scale-110 transition-transform",
													children: leader.name.charAt(0)
												}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ jsx("span", {
														className: "font-black text-slate-900 text-sm",
														children: leader.name
													}), isMe && /* @__PURE__ */ jsx("span", {
														className: "px-1.5 py-0.5 rounded bg-indigo-900 text-white text-[8px] font-black",
														children: "You"
													})]
												}), /* @__PURE__ */ jsx("p", {
													className: `text-[9px] font-black ${getRankColor(leader.rank)}`,
													children: leader.rank
												})] })]
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-5 hidden md:table-cell",
											children: /* @__PURE__ */ jsx("span", {
												className: "text-[11px] font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded tracking-tight border border-slate-100",
												children: leader.career_target || "Generalist"
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-5",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex justify-center -space-x-2",
												children: [leader.top_badges?.map((b, i) => /* @__PURE__ */ jsx("div", {
													className: "w-8 h-8 rounded-full bg-white flex items-center justify-center text-sm shadow-sm border border-slate-100 hover:z-10 transition-all hover:-translate-y-1 cursor-default",
													title: b.name,
													children: b.emoji
												}, i)), leader.badges_count > 3 && /* @__PURE__ */ jsxs("div", {
													className: "w-8 h-8 rounded-full bg-slate-800 text-white text-[9px] font-black flex items-center justify-center border border-white",
													children: ["+", leader.badges_count - 3]
												})]
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-5 text-center",
											children: /* @__PURE__ */ jsxs("div", {
												className: "inline-flex items-center gap-1.5",
												children: [/* @__PURE__ */ jsx("div", {
													className: "w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden",
													children: /* @__PURE__ */ jsx("div", {
														className: `h-full rounded-full ${leader.score >= 80 ? "bg-emerald-500" : leader.score >= 60 ? "bg-indigo-500" : "bg-amber-500"}`,
														style: { width: `${leader.score}%` }
													})
												}), /* @__PURE__ */ jsxs("span", {
													className: "text-[11px] font-black text-slate-900 w-6",
													children: [leader.score, "%"]
												})]
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-5 text-right",
											children: /* @__PURE__ */ jsx("span", {
												className: "text-sm font-black text-indigo-600",
												children: leader.total_points.toLocaleString()
											})
										})
									]
								}, leader.id);
							}), leaders.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
								colSpan: 6,
								className: "px-6 py-12 text-center",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col items-center",
									children: [/* @__PURE__ */ jsx("div", {
										className: "w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4",
										children: /* @__PURE__ */ jsx(Trophy, { className: "w-8 h-8 text-slate-200" })
									}), /* @__PURE__ */ jsx("p", {
										className: "text-sm font-bold text-slate-400",
										children: "Belum ada talenta di leaderboard."
									})]
								})
							}) })]
						})]
					})
				})]
			})
		]
	})] });
}
//#endregion
//#region resources/js/Pages/Market.tsx
var Market_exports = /* @__PURE__ */ __exportAll({ default: () => Market });
function Market({ jobs, trendingSkills, stats, profile, outlook }) {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterLocation, setFilterLocation] = useState("All");
	const filteredJobs = useMemo(() => {
		return (jobs || []).filter((job) => {
			const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesLocation = filterLocation === "All" || job.location === filterLocation;
			return matchesSearch && matchesLocation;
		});
	}, [
		jobs,
		searchTerm,
		filterLocation
	]);
	const locations = Array.from(new Set([...[
		"All",
		"Jakarta",
		"Bandung",
		"Surabaya",
		"Remote",
		"Indonesia"
	], ...(jobs || []).map((j) => j.location)]));
	const handleSetTarget = (targetTitle) => {
		router.post(route("market.set-target"), { target: targetTitle }, { onSuccess: () => {} });
	};
	return /* @__PURE__ */ jsxs(AppLayout, {
		header: "Market Intelligence",
		children: [/* @__PURE__ */ jsx(Head, { title: "Standar Kompetensi Industri | Kembangin" }), /* @__PURE__ */ jsxs("div", {
			className: "max-w-6xl mx-auto pt-4 pb-20 px-4",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("h1", {
						className: "text-4xl font-black text-[#1A1A2E] leading-tight mb-3",
						children: [
							"Standar Kompetensi ",
							/* @__PURE__ */ jsx("br", {}),
							" Industri ",
							/* @__PURE__ */ jsx("span", {
								className: "text-indigo-600",
								children: "Real-Time"
							})
						]
					}), /* @__PURE__ */ jsx("p", {
						className: "text-base font-bold text-slate-400 max-w-2xl leading-relaxed",
						children: "Sinkronisasi kurikulum belajar Anda dengan kebutuhan pasar kerja global. Gunakan data ini sebagai parameter target penguasaan keahlian."
					})] }), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3 bg-white px-6 py-3 rounded-lg border border-slate-100 shadow-sm",
						children: [/* @__PURE__ */ jsx("div", {
							className: "w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center",
							children: /* @__PURE__ */ jsx(Globe, { className: "w-5 h-5 text-indigo-600" })
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "text-[10px] font-black text-slate-400 leading-none mb-1",
							children: "Total Intel"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xl font-black text-[#1A1A2E] leading-none",
							children: stats?.total_jobs || 0
						})] })]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-12 bg-indigo-900 rounded-lg p-8 md:p-10 shadow-2xl shadow-indigo-900/20 relative overflow-hidden",
					children: [/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-lg blur-3xl -mr-20 -mt-20" }), /* @__PURE__ */ jsxs("div", {
						className: "relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "lg:col-span-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white/10 border border-white/20 text-teal-400 text-[10px] font-black mb-6",
									children: [/* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5" }), "Trending Minggu Ini"]
								}),
								/* @__PURE__ */ jsxs("h2", {
									className: "text-3xl font-black text-white leading-tight mb-4",
									children: [
										"Skill Paling ",
										/* @__PURE__ */ jsx("br", {}),
										" Dibutuhkan"
									]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-indigo-100/70 font-bold text-sm leading-relaxed mb-8",
									children: "Keahlian yang paling banyak diminta industri saat ini berdasarkan ribuan titik data lowongan."
								})
							]
						}), /* @__PURE__ */ jsx("div", {
							className: "lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-4",
							children: trendingSkills?.slice(0, 6).map((skill, i) => /* @__PURE__ */ jsxs("div", {
								className: "bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-lg hover:bg-white/10 transition-colors",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex justify-between items-start mb-3",
										children: [/* @__PURE__ */ jsx("p", {
											className: "text-[9px] font-black text-teal-400",
											children: skill.trend === "rising" ? "📈 Rising" : "💎 Core"
										}), /* @__PURE__ */ jsx(Zap, { className: "w-3.5 h-3.5 text-indigo-300" })]
									}),
									/* @__PURE__ */ jsx("h4", {
										className: "text-base font-black text-white mb-4 truncate",
										children: skill.skill
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex justify-between text-[9px] font-black text-indigo-300",
											children: [/* @__PURE__ */ jsx("span", { children: "Demand Intensity" }), /* @__PURE__ */ jsxs("span", { children: [skill.demand, "%"] })]
										}), /* @__PURE__ */ jsx("div", {
											className: "h-1.5 bg-indigo-950 rounded-lg overflow-hidden",
											children: /* @__PURE__ */ jsx("div", {
												className: "h-full bg-teal-400 rounded-lg",
												style: { width: `${skill.demand}%` }
											})
										})]
									})
								]
							}, i))
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 lg:grid-cols-12 gap-8",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "lg:col-span-4 space-y-8",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "bg-white rounded-lg p-8 border border-slate-100 shadow-sm",
							children: [
								/* @__PURE__ */ jsxs("h4", {
									className: "text-base font-black text-[#1A1A2E] mb-6 flex items-center gap-2 tracking-tight",
									children: [/* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5 text-teal-500" }), "Market Sentiment"]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "bg-slate-50 p-6 rounded-lg border border-slate-50 italic text-sm font-bold text-slate-500 leading-relaxed mb-6",
									children: [
										"\"",
										outlook?.summary || "Gunakan standar ini untuk memvalidasi roadmap belajar Anda agar sesuai dengan kebutuhan pasar kerja saat ini.",
										"\""
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-4",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-[10px] font-black text-slate-400",
										children: "Future-Proof Targets"
									}), /* @__PURE__ */ jsx("div", {
										className: "flex flex-wrap gap-2",
										children: outlook?.future_skills?.map((s) => /* @__PURE__ */ jsx("span", {
											className: "bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg text-[10px] font-black tracking-tight border border-indigo-100",
											children: s
										}, s))
									})]
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "bg-white rounded-lg p-8 border border-slate-100 shadow-sm",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-4 mb-6",
								children: [/* @__PURE__ */ jsx("div", {
									className: "w-12 h-12 rounded-lg bg-indigo-900 flex items-center justify-center text-white shadow-lg shadow-indigo-100",
									children: /* @__PURE__ */ jsx(Target, { className: "w-6 h-6" })
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
									className: "text-base font-black text-[#1A1A2E] leading-none mb-1",
									children: "Target Kurikulum"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-[10px] font-bold text-slate-400",
									children: "Benchmark Mode"
								})] })]
							}), /* @__PURE__ */ jsx("p", {
								className: "text-[13px] text-slate-500 font-bold leading-relaxed",
								children: "Setiap standar di panel kanan ditarik dari kebutuhan perusahaan global secara real-time."
							})]
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "lg:col-span-8 space-y-6",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "bg-white p-3 rounded-lg border border-slate-100 shadow-xl shadow-slate-200/20 flex flex-col md:flex-row gap-3 items-center sticky top-24 z-20",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex-1 relative w-full",
								children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" }), /* @__PURE__ */ jsx("input", {
									type: "text",
									value: searchTerm,
									onChange: (e) => setSearchTerm(e.target.value),
									placeholder: "Cari target kompetensi...",
									className: "w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-lg text-sm font-bold text-[#1A1A2E] focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400"
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "flex items-center gap-3 w-full md:w-auto",
								children: /* @__PURE__ */ jsx("select", {
									value: filterLocation,
									onChange: (e) => setFilterLocation(e.target.value),
									className: "flex-1 md:flex-none pl-5 pr-10 py-4 bg-indigo-50/50 border-none rounded-lg text-xs font-black text-indigo-900 cursor-pointer outline-none appearance-none",
									children: locations.map((l) => /* @__PURE__ */ jsx("option", {
										value: l,
										children: l
									}, l))
								})
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "space-y-4 max-h-[850px] overflow-y-auto pr-2 custom-scrollbar",
							children: filteredJobs.length === 0 ? /* @__PURE__ */ jsxs("div", {
								className: "text-center py-24 bg-white rounded-lg border-2 border-dashed border-slate-100",
								children: [/* @__PURE__ */ jsx("div", {
									className: "w-20 h-20 bg-slate-50 rounded-lg flex items-center justify-center mx-auto mb-6",
									children: /* @__PURE__ */ jsx(Search, { className: "w-8 h-8 text-slate-200" })
								}), /* @__PURE__ */ jsx("h3", {
									className: "text-xl font-black text-slate-300 tracking-tight",
									children: "Data Tidak Ditemukan"
								})]
							}) : filteredJobs.map((job) => /* @__PURE__ */ jsxs("div", {
								className: "group bg-white p-8 rounded-lg border border-slate-50 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all mb-4 last:mb-0",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col md:flex-row justify-between gap-6 mb-8",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex-1",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-3 mb-4",
												children: [/* @__PURE__ */ jsx("div", {
													className: "w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors",
													children: /* @__PURE__ */ jsx(Target, { className: "w-5 h-5" })
												}), /* @__PURE__ */ jsx("h3", {
													className: "text-xl font-black text-[#1A1A2E] group-hover:text-indigo-600 transition-colors leading-tight",
													children: job.title
												})]
											}), /* @__PURE__ */ jsxs("div", {
												className: "flex flex-wrap gap-5 items-center",
												children: [/* @__PURE__ */ jsxs("span", {
													className: "flex items-center gap-1.5 text-xs font-bold text-slate-400 tracking-tight",
													children: [
														/* @__PURE__ */ jsx(Building2, { className: "w-4 h-4 text-indigo-400" }),
														" ",
														job.company
													]
												}), /* @__PURE__ */ jsxs("span", {
													className: "flex items-center gap-1.5 text-xs font-bold text-slate-400 tracking-tight",
													children: [
														/* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 text-indigo-400" }),
														" ",
														job.location
													]
												})]
											})]
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex flex-col items-end gap-2",
											children: [/* @__PURE__ */ jsx("p", {
												className: "text-[10px] font-black text-slate-400",
												children: "Readiness Level"
											}), /* @__PURE__ */ jsxs("div", {
												className: `px-5 py-3 rounded-lg text-xl font-black shadow-sm ${job.match_score >= 80 ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : job.match_score >= 50 ? "bg-amber-50 text-amber-600 border border-amber-100" : "bg-slate-50 text-slate-400 border border-slate-100"}`,
												children: [job.match_score, "% Match"]
											})]
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pt-8 border-t border-slate-50",
										children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
											className: "text-[10px] font-black text-emerald-600 mb-4 flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4" }), " Keahlian yang Anda Punya"]
										}), /* @__PURE__ */ jsx("div", {
											className: "flex flex-wrap gap-2",
											children: job.skills_required?.filter((skill) => profile?.skills?.some((s) => s.name.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(s.name.toLowerCase()))).map((skill) => /* @__PURE__ */ jsx("span", {
												className: "bg-indigo-900 text-white px-4 py-1.5 rounded-lg text-[10px] font-bold",
												children: skill
											}, skill)) || /* @__PURE__ */ jsx("span", {
												className: "text-[10px] font-bold text-slate-300",
												children: "Belum ada kecocokan"
											})
										})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
											className: "text-[10px] font-black text-rose-500 mb-4 flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(CircleDashed, { className: "w-4 h-4" }), " Keahlian Harus Dipelajari"]
										}), /* @__PURE__ */ jsx("div", {
											className: "flex flex-wrap gap-2",
											children: job.skills_required?.filter((skill) => !profile?.skills?.some((s) => s.name.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(s.name.toLowerCase()))).map((skill) => /* @__PURE__ */ jsx("span", {
												className: "bg-rose-50 text-rose-600 px-4 py-1.5 rounded-lg text-[10px] font-bold border border-rose-100",
												children: skill
											}, skill)) || /* @__PURE__ */ jsx("span", {
												className: "text-[10px] font-bold text-slate-300",
												children: "Sudah memenuhi semua"
											})
										})] })]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col sm:flex-row justify-between items-center gap-6 pt-6 border-t border-slate-50/50",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2 text-[10px] font-black text-slate-400",
											children: [/* @__PURE__ */ jsx(Info, { className: "w-4 h-4 text-indigo-400" }), " Dashboard Benchmark v2.0"]
										}), /* @__PURE__ */ jsxs("button", {
											onClick: () => handleSetTarget(job.title),
											className: "w-full sm:w-auto bg-indigo-900 text-white px-8 py-4 rounded-lg font-black text-sm flex items-center justify-center gap-3 hover:bg-indigo-800 transition-all shadow-xl shadow-indigo-900/10 active:scale-[0.98]",
											children: ["Jadikan Target Belajar ", /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" })]
										})]
									})
								]
							}, job.id))
						})]
					})]
				})
			]
		})]
	});
}
//#endregion
//#region resources/js/Pages/Notifications.tsx
var Notifications_exports = /* @__PURE__ */ __exportAll({ default: () => Notifications });
function Notifications({ notifications }) {
	return /* @__PURE__ */ jsxs(AppLayout, {
		header: "Notifications",
		children: [/* @__PURE__ */ jsx(Head, { title: "Notifications | Kembangin" }), /* @__PURE__ */ jsx("div", {
			className: "max-w-4xl mx-auto space-y-6",
			children: /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-3xl p-6 shadow-sm border border-slate-100",
				children: [/* @__PURE__ */ jsx("h3", {
					className: "text-lg font-bold text-[#1A1A2E] mb-4",
					children: "Daftar Notifikasi"
				}), /* @__PURE__ */ jsxs("div", {
					className: "space-y-3",
					children: [notifications.length === 0 && /* @__PURE__ */ jsx("p", {
						className: "text-sm text-slate-500",
						children: "Belum ada notifikasi."
					}), notifications.map((item) => /* @__PURE__ */ jsxs("div", {
						className: "border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex-1",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-sm font-bold text-[#1A1A2E]",
									children: item.title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-xs text-slate-500",
									children: item.body || "Tidak ada pesan"
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "text-xs text-slate-400 mt-1",
									children: [
										"Tipe: ",
										item.type,
										" · ",
										item.read_at ? "Sudah dibaca" : "Belum dibaca"
									]
								})
							]
						}), /* @__PURE__ */ jsx("div", {
							className: "flex gap-2",
							children: !item.read_at && /* @__PURE__ */ jsx(Link, {
								href: route("notifications.read", item.id),
								method: "patch",
								as: "button",
								className: "px-3 py-1.5 rounded-full text-xs font-semibold border border-slate-200",
								children: "Tandai Dibaca"
							})
						})]
					}, item.id))]
				})]
			})
		})]
	});
}
//#endregion
//#region resources/js/Pages/Onboarding.tsx
var Onboarding_exports = /* @__PURE__ */ __exportAll({ default: () => Onboarding });
var ROLES = [
	{
		title: "Frontend Engineer",
		icon: Monitor,
		color: "text-blue-500",
		bg: "bg-blue-50"
	},
	{
		title: "Backend Engineer",
		icon: Database,
		color: "text-emerald-500",
		bg: "bg-emerald-50"
	},
	{
		title: "Data Scientist",
		icon: Cpu,
		color: "text-purple-500",
		bg: "bg-purple-50"
	},
	{
		title: "Mobile Developer",
		icon: Smartphone,
		color: "text-indigo-500",
		bg: "bg-indigo-50"
	},
	{
		title: "UI/UX Designer",
		icon: Palette,
		color: "text-pink-500",
		bg: "bg-pink-50"
	},
	{
		title: "Graphic Designer",
		icon: Palette,
		color: "text-rose-500",
		bg: "bg-rose-50"
	},
	{
		title: "Social Media Specialist",
		icon: Megaphone,
		color: "text-orange-500",
		bg: "bg-orange-50"
	},
	{
		title: "Content Writer",
		icon: FileText,
		color: "text-slate-600",
		bg: "bg-slate-100"
	},
	{
		title: "Project Manager",
		icon: Briefcase,
		color: "text-cyan-600",
		bg: "bg-cyan-50"
	},
	{
		title: "HR Specialist",
		icon: Users,
		color: "text-violet-600",
		bg: "bg-violet-50"
	},
	{
		title: "Accountant",
		icon: Calculator,
		color: "text-green-600",
		bg: "bg-green-50"
	},
	{
		title: "Financial Analyst",
		icon: DollarSign,
		color: "text-emerald-600",
		bg: "bg-emerald-50"
	},
	{
		title: "English Teacher",
		icon: GraduationCap,
		color: "text-sky-600",
		bg: "bg-sky-50"
	},
	{
		title: "Chef / Cook",
		icon: Utensils,
		color: "text-orange-600",
		bg: "bg-orange-50"
	},
	{
		title: "Barista",
		icon: Coffee,
		color: "text-amber-800",
		bg: "bg-amber-50"
	}
];
function Onboarding() {
	const [step, setStep] = useState(1);
	const [careerTargets, setCareerTargets] = useState([]);
	const [skills, setSkills] = useState([]);
	const [tempSkill, setTempSkill] = useState("");
	const [cvText, setCvText] = useState("");
	const addSkill = (e) => {
		e.preventDefault();
		if (tempSkill.trim() && !skills.includes(tempSkill.trim())) {
			setSkills([...skills, tempSkill.trim()]);
			setTempSkill("");
		}
	};
	const removeSkill = (skill) => {
		setSkills(skills.filter((s) => s !== skill));
	};
	const handleFinish = () => {
		router.post(route("onboarding.store"), {
			career_target: careerTargets,
			skills: skills.map((s) => ({
				name: s,
				level: "intermediate"
			})),
			cv_text: cvText
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4",
		children: [/* @__PURE__ */ jsx(Head, { title: "Onboarding | Kembangin" }), /* @__PURE__ */ jsxs("div", {
			className: "max-w-4xl w-full",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "mb-12 flex items-center justify-between px-10 relative",
				children: [
					/* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 -z-10" }),
					/* @__PURE__ */ jsx("div", {
						className: "absolute top-1/2 left-0 h-1 bg-teal-500 -translate-y-1/2 -z-10 transition-all duration-500",
						style: { width: `${(step - 1) / 2 * 100}%` }
					}),
					[
						1,
						2,
						3
					].map((s) => /* @__PURE__ */ jsx("div", {
						className: `w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 transition-all duration-300 ${step >= s ? "bg-teal-500 border-teal-200 text-white" : "bg-white border-slate-200 text-slate-400"}`,
						children: step > s ? /* @__PURE__ */ jsx(Check, { className: "w-5 h-5" }) : s
					}, s))
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-[2rem] shadow-xl p-8 md:p-12 min-h-[500px] flex flex-col",
				children: [
					step === 1 && /* @__PURE__ */ jsxs("div", {
						className: "animate-in fade-in slide-in-from-right duration-500 flex-1",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "text-3xl font-black text-navy-900 mb-2",
								children: "Pilih Target Karirmu"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-slate-500 mb-10",
								children: "Pilih satu atau lebih role yang ingin kamu capai atau kembangkan saat ini."
							}),
							/* @__PURE__ */ jsx("div", {
								className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
								children: ROLES.map((role) => {
									const isSelected = careerTargets.includes(role.title);
									return /* @__PURE__ */ jsxs("button", {
										onClick: () => {
											if (isSelected) setCareerTargets(careerTargets.filter((t) => t !== role.title));
											else setCareerTargets([...careerTargets, role.title]);
										},
										className: `relative p-6 rounded-2xl flex flex-col items-center gap-4 transition-all duration-300 border-2 ${isSelected ? "border-teal-500 bg-teal-50 shadow-lg shadow-teal-500/10 scale-105" : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"}`,
										children: [
											isSelected && /* @__PURE__ */ jsx("div", {
												className: "absolute top-3 right-3 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center text-white scale-in duration-300",
												children: /* @__PURE__ */ jsx(Check, { className: "w-3 h-3" })
											}),
											/* @__PURE__ */ jsx("div", {
												className: `w-14 h-14 rounded-xl ${role.bg} ${role.color} flex items-center justify-center`,
												children: /* @__PURE__ */ jsx(role.icon, { className: "w-8 h-8" })
											}),
											/* @__PURE__ */ jsx("span", {
												className: "text-sm font-bold text-navy-900 text-center",
												children: role.title
											})
										]
									}, role.title);
								})
							})
						]
					}),
					step === 2 && /* @__PURE__ */ jsxs("div", {
						className: "animate-in fade-in slide-in-from-right duration-500 flex-1",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "text-3xl font-black text-navy-900 mb-2",
								children: "Skill yang Kamu Miliki"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-slate-500 mb-10",
								children: "Tuliskan skill teknis atau soft-skill yang saat ini sudah kamu kuasai."
							}),
							/* @__PURE__ */ jsx("form", {
								onSubmit: addSkill,
								className: "mb-8",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex gap-3",
									children: [/* @__PURE__ */ jsx("div", {
										className: "relative flex-1",
										children: /* @__PURE__ */ jsx("input", {
											type: "text",
											value: tempSkill,
											onChange: (e) => setTempSkill(e.target.value),
											placeholder: "Contoh: React.js, Python, Figma...",
											className: "w-full px-5 py-4 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 font-medium"
										})
									}), /* @__PURE__ */ jsx("button", {
										type: "submit",
										className: "p-4 bg-navy-900 text-white rounded-2xl hover:scale-105 transition-transform active:scale-95",
										children: /* @__PURE__ */ jsx(Plus, { className: "w-6 h-6" })
									})]
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-wrap gap-3",
								children: [skills.length === 0 && /* @__PURE__ */ jsx("p", {
									className: "text-slate-400 italic",
									children: "Belum ada skill yang ditambahkan..."
								}), skills.map((skill) => /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-100 rounded-xl font-bold text-navy-800 animate-in zoom-in duration-300",
									children: [skill, /* @__PURE__ */ jsx("button", {
										onClick: () => removeSkill(skill),
										className: "p-1 hover:text-red-500 transition-colors",
										children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
									})]
								}, skill))]
							})
						]
					}),
					step === 3 && /* @__PURE__ */ jsxs("div", {
						className: "animate-in fade-in slide-in-from-right duration-500 flex-1",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "text-3xl font-black text-navy-900 mb-2",
								children: "Salin & Tempel CV (Opsional)"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-slate-500 mb-10",
								children: "AI akan menganalisis profilmu lebih detail jika kamu memberikan teks CV-mu."
							}),
							/* @__PURE__ */ jsx("textarea", {
								value: cvText,
								onChange: (e) => setCvText(e.target.value),
								className: "w-full h-64 p-6 bg-slate-100 border-none rounded-3xl focus:ring-2 focus:ring-teal-500 font-medium text-sm leading-relaxed",
								placeholder: "Paste isi CV kamu di sini (Pendidikan, Pengalaman, dll)..."
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-4 text-xs text-slate-400 italic text-right",
								children: "Data aman dan hanya digunakan untuk analisis karirmu."
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-12 flex items-center justify-between pt-8 border-t border-slate-100",
						children: [/* @__PURE__ */ jsxs("button", {
							onClick: () => setStep((s) => Math.max(1, s - 1)),
							disabled: step === 1,
							className: `flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-colors ${step === 1 ? "text-slate-300 cursor-not-allowed" : "text-navy-900 hover:bg-slate-100"}`,
							children: [/* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5" }), "Kembali"]
						}), step < 3 ? /* @__PURE__ */ jsxs("button", {
							onClick: () => setStep((s) => s + 1),
							disabled: step === 1 && careerTargets.length === 0,
							className: `flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${step === 1 && careerTargets.length === 0 ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-navy-900 text-white shadow-navy-900/20 hover:scale-105"}`,
							children: ["Lanjut", /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" })]
						}) : /* @__PURE__ */ jsxs("button", {
							onClick: handleFinish,
							className: "flex items-center gap-2 px-10 py-3 bg-teal-500 text-white rounded-xl font-black shadow-lg shadow-teal-500/20 hover:scale-105 transition-all",
							children: ["Selesai", /* @__PURE__ */ jsx(Check, { className: "w-6 h-6" })]
						})]
					})
				]
			})]
		})]
	});
}
//#endregion
//#region resources/js/Components/DangerButton.tsx
function DangerButton({ className = "", disabled, children, ...props }) {
	return /* @__PURE__ */ jsx("button", {
		...props,
		className: `inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700 dark:focus:ring-offset-gray-800 ${disabled && "opacity-25"} ` + className,
		disabled,
		children
	});
}
//#endregion
//#region resources/js/Components/Modal.tsx
function Modal({ children, show = false, maxWidth = "2xl", closeable = true, onClose = () => {} }) {
	const close = () => {
		if (closeable) onClose();
	};
	const maxWidthClass = {
		sm: "sm:max-w-sm",
		md: "sm:max-w-md",
		lg: "sm:max-w-lg",
		xl: "sm:max-w-xl",
		"2xl": "sm:max-w-2xl"
	}[maxWidth];
	return /* @__PURE__ */ jsx(Transition, {
		show,
		leave: "duration-200",
		children: /* @__PURE__ */ jsxs(Dialog, {
			as: "div",
			id: "modal",
			className: "fixed inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0",
			onClose: close,
			children: [/* @__PURE__ */ jsx(TransitionChild, {
				enter: "ease-out duration-300",
				enterFrom: "opacity-0",
				enterTo: "opacity-100",
				leave: "ease-in duration-200",
				leaveFrom: "opacity-100",
				leaveTo: "opacity-0",
				children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-500/75 dark:bg-gray-900/75" })
			}), /* @__PURE__ */ jsx(TransitionChild, {
				enter: "ease-out duration-300",
				enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
				enterTo: "opacity-100 translate-y-0 sm:scale-100",
				leave: "ease-in duration-200",
				leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
				leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
				children: /* @__PURE__ */ jsx(DialogPanel, {
					className: `mb-6 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:mx-auto sm:w-full dark:bg-gray-800 ${maxWidthClass}`,
					children
				})
			})]
		})
	});
}
//#endregion
//#region resources/js/Components/SecondaryButton.tsx
function SecondaryButton({ type = "button", className = "", disabled, children, ...props }) {
	return /* @__PURE__ */ jsx("button", {
		...props,
		type,
		className: `inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800 ${disabled && "opacity-25"} ` + className,
		disabled,
		children
	});
}
//#endregion
//#region resources/js/Pages/Profile/Partials/DeleteUserForm.tsx
var DeleteUserForm_exports = /* @__PURE__ */ __exportAll({ default: () => DeleteUserForm });
function DeleteUserForm({ className = "" }) {
	const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
	const passwordInput = useRef(null);
	const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({ password: "" });
	const confirmUserDeletion = () => {
		setConfirmingUserDeletion(true);
	};
	const deleteUser = (e) => {
		e.preventDefault();
		destroy(route("profile.destroy"), {
			preserveScroll: true,
			onSuccess: () => closeModal(),
			onError: () => passwordInput.current?.focus(),
			onFinish: () => reset()
		});
	};
	const closeModal = () => {
		setConfirmingUserDeletion(false);
		clearErrors();
		reset();
	};
	return /* @__PURE__ */ jsxs("section", {
		className: `space-y-6 ${className}`,
		children: [
			/* @__PURE__ */ jsxs("header", { children: [/* @__PURE__ */ jsx("h2", {
				className: "text-lg font-medium text-gray-900 dark:text-gray-100",
				children: "Delete Account"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-1 text-sm text-gray-600 dark:text-gray-400",
				children: "Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain."
			})] }),
			/* @__PURE__ */ jsx(DangerButton, {
				onClick: confirmUserDeletion,
				children: "Delete Account"
			}),
			/* @__PURE__ */ jsx(Modal, {
				show: confirmingUserDeletion,
				onClose: closeModal,
				children: /* @__PURE__ */ jsxs("form", {
					onSubmit: deleteUser,
					className: "p-6",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "text-lg font-medium text-gray-900 dark:text-gray-100",
							children: "Are you sure you want to delete your account?"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-1 text-sm text-gray-600 dark:text-gray-400",
							children: "Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-6",
							children: [
								/* @__PURE__ */ jsx(InputLabel, {
									htmlFor: "password",
									value: "Password",
									className: "sr-only"
								}),
								/* @__PURE__ */ jsx(TextInput_default, {
									id: "password",
									type: "password",
									name: "password",
									ref: passwordInput,
									value: data.password,
									onChange: (e) => setData("password", e.target.value),
									className: "mt-1 block w-3/4",
									isFocused: true,
									placeholder: "Password"
								}),
								/* @__PURE__ */ jsx(InputError, {
									message: errors.password,
									className: "mt-2"
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-6 flex justify-end",
							children: [/* @__PURE__ */ jsx(SecondaryButton, {
								onClick: closeModal,
								children: "Cancel"
							}), /* @__PURE__ */ jsx(DangerButton, {
								className: "ms-3",
								disabled: processing,
								children: "Delete Account"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region resources/js/Pages/Profile/Partials/UpdatePasswordForm.tsx
var UpdatePasswordForm_exports = /* @__PURE__ */ __exportAll({ default: () => UpdatePasswordForm });
function UpdatePasswordForm({ className = "" }) {
	const passwordInput = useRef(null);
	const currentPasswordInput = useRef(null);
	const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
		current_password: "",
		password: "",
		password_confirmation: ""
	});
	const updatePassword = (e) => {
		e.preventDefault();
		put(route("password.update"), {
			preserveScroll: true,
			onSuccess: () => reset(),
			onError: (errors) => {
				if (errors.password) {
					reset("password", "password_confirmation");
					passwordInput.current?.focus();
				}
				if (errors.current_password) {
					reset("current_password");
					currentPasswordInput.current?.focus();
				}
			}
		});
	};
	return /* @__PURE__ */ jsxs("section", {
		className,
		children: [/* @__PURE__ */ jsxs("header", { children: [/* @__PURE__ */ jsx("h2", {
			className: "text-lg font-medium text-gray-900 dark:text-gray-100",
			children: "Update Password"
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-1 text-sm text-gray-600 dark:text-gray-400",
			children: "Ensure your account is using a long, random password to stay secure."
		})] }), /* @__PURE__ */ jsxs("form", {
			onSubmit: updatePassword,
			className: "mt-6 space-y-6",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx(InputLabel, {
						htmlFor: "current_password",
						value: "Current Password"
					}),
					/* @__PURE__ */ jsx(TextInput_default, {
						id: "current_password",
						ref: currentPasswordInput,
						value: data.current_password,
						onChange: (e) => setData("current_password", e.target.value),
						type: "password",
						className: "mt-1 block w-full",
						autoComplete: "current-password"
					}),
					/* @__PURE__ */ jsx(InputError, {
						message: errors.current_password,
						className: "mt-2"
					})
				] }),
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx(InputLabel, {
						htmlFor: "password",
						value: "New Password"
					}),
					/* @__PURE__ */ jsx(TextInput_default, {
						id: "password",
						ref: passwordInput,
						value: data.password,
						onChange: (e) => setData("password", e.target.value),
						type: "password",
						className: "mt-1 block w-full",
						autoComplete: "new-password"
					}),
					/* @__PURE__ */ jsx(InputError, {
						message: errors.password,
						className: "mt-2"
					})
				] }),
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx(InputLabel, {
						htmlFor: "password_confirmation",
						value: "Confirm Password"
					}),
					/* @__PURE__ */ jsx(TextInput_default, {
						id: "password_confirmation",
						value: data.password_confirmation,
						onChange: (e) => setData("password_confirmation", e.target.value),
						type: "password",
						className: "mt-1 block w-full",
						autoComplete: "new-password"
					}),
					/* @__PURE__ */ jsx(InputError, {
						message: errors.password_confirmation,
						className: "mt-2"
					})
				] }),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ jsx(PrimaryButton, {
						disabled: processing,
						children: "Save"
					}), /* @__PURE__ */ jsx(Transition, {
						show: recentlySuccessful,
						enter: "transition ease-in-out",
						enterFrom: "opacity-0",
						leave: "transition ease-in-out",
						leaveTo: "opacity-0",
						children: /* @__PURE__ */ jsx("p", {
							className: "text-sm text-gray-600 dark:text-gray-400",
							children: "Saved."
						})
					})]
				})
			]
		})]
	});
}
//#endregion
//#region resources/js/Pages/Profile/Partials/UpdateProfileInformationForm.tsx
var UpdateProfileInformationForm_exports = /* @__PURE__ */ __exportAll({ default: () => UpdateProfileInformation });
function UpdateProfileInformation({ mustVerifyEmail, status, className = "" }) {
	const user = usePage().props.auth.user;
	const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
		name: user.name,
		email: user.email
	});
	const submit = (e) => {
		e.preventDefault();
		patch(route("profile.update"));
	};
	return /* @__PURE__ */ jsxs("section", {
		className,
		children: [/* @__PURE__ */ jsxs("header", { children: [/* @__PURE__ */ jsx("h2", {
			className: "text-lg font-medium text-gray-900 dark:text-gray-100",
			children: "Profile Information"
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-1 text-sm text-gray-600 dark:text-gray-400",
			children: "Update your account's profile information and email address."
		})] }), /* @__PURE__ */ jsxs("form", {
			onSubmit: submit,
			className: "mt-6 space-y-6",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx(InputLabel, {
						htmlFor: "name",
						value: "Name"
					}),
					/* @__PURE__ */ jsx(TextInput_default, {
						id: "name",
						className: "mt-1 block w-full",
						value: data.name,
						onChange: (e) => setData("name", e.target.value),
						required: true,
						isFocused: true,
						autoComplete: "name"
					}),
					/* @__PURE__ */ jsx(InputError, {
						className: "mt-2",
						message: errors.name
					})
				] }),
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx(InputLabel, {
						htmlFor: "email",
						value: "Email"
					}),
					/* @__PURE__ */ jsx(TextInput_default, {
						id: "email",
						type: "email",
						className: "mt-1 block w-full",
						value: data.email,
						onChange: (e) => setData("email", e.target.value),
						required: true,
						autoComplete: "username"
					}),
					/* @__PURE__ */ jsx(InputError, {
						className: "mt-2",
						message: errors.email
					})
				] }),
				mustVerifyEmail && user.email_verified_at === null && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
					className: "mt-2 text-sm text-gray-800 dark:text-gray-200",
					children: ["Your email address is unverified.", /* @__PURE__ */ jsx(Link, {
						href: route("verification.send"),
						method: "post",
						as: "button",
						className: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800",
						children: "Click here to re-send the verification email."
					})]
				}), status === "verification-link-sent" && /* @__PURE__ */ jsx("div", {
					className: "mt-2 text-sm font-medium text-green-600 dark:text-green-400",
					children: "A new verification link has been sent to your email address."
				})] }),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ jsx(PrimaryButton, {
						disabled: processing,
						children: "Save"
					}), /* @__PURE__ */ jsx(Transition, {
						show: recentlySuccessful,
						enter: "transition ease-in-out",
						enterFrom: "opacity-0",
						leave: "transition ease-in-out",
						leaveTo: "opacity-0",
						children: /* @__PURE__ */ jsx("p", {
							className: "text-sm text-gray-600 dark:text-gray-400",
							children: "Saved."
						})
					})]
				})
			]
		})]
	});
}
//#endregion
//#region resources/js/Pages/Profile/Edit.tsx
var Edit_exports = /* @__PURE__ */ __exportAll({ default: () => Edit });
function Edit({ mustVerifyEmail, status }) {
	return /* @__PURE__ */ jsxs(AppLayout, {
		header: "Pengaturan Profil",
		children: [/* @__PURE__ */ jsx(Head, { title: "Profile" }), /* @__PURE__ */ jsx("div", {
			className: "py-12",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800",
						children: /* @__PURE__ */ jsx(UpdateProfileInformation, {
							mustVerifyEmail,
							status,
							className: "max-w-xl"
						})
					}),
					/* @__PURE__ */ jsx("div", {
						className: "bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800",
						children: /* @__PURE__ */ jsx(UpdatePasswordForm, { className: "max-w-xl" })
					}),
					/* @__PURE__ */ jsx("div", {
						className: "bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800",
						children: /* @__PURE__ */ jsx(DeleteUserForm, { className: "max-w-xl" })
					})
				]
			})
		})]
	});
}
//#endregion
//#region resources/js/Pages/Profile/Portfolio.tsx
var Portfolio_exports = /* @__PURE__ */ __exportAll({ default: () => Portfolio });
function Portfolio({ projects, user }) {
	const { badges, profile, workReadinessScore } = user;
	const [techInput, setTechInput] = useState("");
	const { data, setData, post, processing, errors, reset } = useForm({
		title: "",
		description: "",
		github_url: "",
		demo_url: "",
		tech_stack: [],
		visibility: "public"
	});
	const handleAddTech = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			const val = techInput.trim();
			if (val && !data.tech_stack.includes(val)) setData("tech_stack", [...data.tech_stack, val]);
			setTechInput("");
		}
	};
	const removeTech = (tech) => {
		setData("tech_stack", data.tech_stack.filter((t) => t !== tech));
	};
	const submit = (e) => {
		e.preventDefault();
		post(route("portfolio.store"), { onSuccess: () => reset() });
	};
	const handleDelete = (id) => {
		if (confirm("Yakin ingin menghapus project ini?")) router.delete(route("portfolio.destroy", id), { preserveScroll: true });
	};
	return /* @__PURE__ */ jsxs(AppLayout, { children: [/* @__PURE__ */ jsx(Head, { title: "Portfolio" }), /* @__PURE__ */ jsxs("div", {
		className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "relative overflow-hidden rounded-lg bg-indigo-900 text-white shadow-2xl",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "absolute inset-0 opacity-10",
					children: [/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-20 -mt-20 blur-3xl" }), /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-64 h-64 bg-indigo-400 rounded-full -ml-20 -mb-20 blur-3xl" })]
				}), /* @__PURE__ */ jsxs("div", {
					className: "relative z-10 flex flex-col md:flex-row justify-between items-center p-8 md:p-10 gap-8",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col md:flex-row items-center gap-8 text-center md:text-left",
						children: [/* @__PURE__ */ jsx("div", {
							className: "w-24 h-24 rounded-full bg-white shadow-2xl flex items-center justify-center text-4xl font-black text-indigo-900 border-4 border-white/20",
							children: user.name.charAt(0)
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
							className: "text-3xl font-black tracking-tight mb-2",
							children: user.name
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap items-center justify-center md:justify-start gap-3",
							children: [/* @__PURE__ */ jsx("span", {
								className: "px-3 py-1 bg-white/10 rounded-lg text-xs font-black text-indigo-100 border border-white/10",
								children: profile?.career_target || "Generalist"
							}), /* @__PURE__ */ jsxs("span", {
								className: "flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 rounded-lg text-xs font-black text-amber-400 border border-amber-400/20",
								children: [
									/* @__PURE__ */ jsx(Award, { className: "w-3 h-3" }),
									" ",
									user.rank
								]
							})]
						})] })]
					}), /* @__PURE__ */ jsx("div", {
						className: "flex flex-col items-center md:items-end gap-4",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-6",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "text-center md:text-right border-r border-white/10 pr-6",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-[10px] font-bold text-indigo-300 mb-1",
									children: "Total Points"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-3xl font-black text-white",
									children: user.total_points.toLocaleString()
								})]
							}), /* @__PURE__ */ jsxs(Link, {
								href: route("profile.public", user.id),
								className: "bg-white text-indigo-900 hover:bg-indigo-50 px-6 py-3 rounded-lg font-black text-xs transition-all flex items-center gap-2 shadow-xl active:scale-95",
								children: [/* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4" }), " Lihat Profil Publik"]
							})]
						})
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-lg p-8 shadow-sm border border-slate-100",
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex items-center justify-between mb-8",
					children: /* @__PURE__ */ jsxs("h3", {
						className: "text-sm font-black text-slate-900 flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx(Award, { className: "w-4 h-4 text-amber-500" }),
							" Pencapaian Badge (",
							badges.length,
							")"
						]
					})
				}), badges.length === 0 ? /* @__PURE__ */ jsx("div", {
					className: "py-6 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200",
					children: /* @__PURE__ */ jsx("p", {
						className: "text-slate-400 text-xs font-bold",
						children: "Belum ada badge yang diraih"
					})
				}) : /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4",
					children: badges.map((b) => /* @__PURE__ */ jsxs("div", {
						className: "group relative flex flex-col items-center p-4 bg-white border border-slate-100 rounded-lg transition-all hover:shadow-xl hover:border-indigo-200 hover:-translate-y-1 text-center",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "text-4xl mb-3 drop-shadow-sm transition-transform group-hover:scale-110",
								children: b.emoji
							}),
							/* @__PURE__ */ jsx("div", {
								className: "font-black text-[11px] text-slate-800 line-clamp-1",
								children: b.name
							}),
							/* @__PURE__ */ jsx("div", {
								className: `text-[8px] font-black mt-1 ${b.rarity === "EPIC" ? "text-purple-500" : b.rarity === "RARE" ? "text-amber-600" : "text-slate-400"}`,
								children: b.rarity
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "absolute opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 bg-slate-900 text-[10px] leading-relaxed text-white p-3 rounded-lg shadow-2xl z-20 text-center transition-all",
								children: [b.description, /* @__PURE__ */ jsx("div", { className: "absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900" })]
							})
						]
					}, b.id))
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",
				children: [/* @__PURE__ */ jsx("div", {
					className: "lg:col-span-4",
					children: /* @__PURE__ */ jsxs("div", {
						className: "bg-white rounded-lg p-6 shadow-sm border border-slate-100 sticky top-8",
						children: [/* @__PURE__ */ jsxs("h3", {
							className: "text-sm font-black text-slate-900 mb-6 flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(FolderGit2, { className: "w-4 h-4 text-indigo-600" }), " Tambah Project Baru"]
						}), /* @__PURE__ */ jsxs("form", {
							onSubmit: submit,
							className: "space-y-5",
							children: [
								/* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx("label", {
										className: "block text-[11px] font-black text-slate-500 mb-1.5",
										children: "Nama Project"
									}),
									/* @__PURE__ */ jsx("input", {
										type: "text",
										value: data.title,
										onChange: (e) => setData("title", e.target.value),
										required: true,
										className: "w-full bg-slate-50 border-slate-200 rounded-lg text-sm font-bold focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all px-4 py-3",
										placeholder: "E-Commerce API"
									}),
									errors.title && /* @__PURE__ */ jsx("div", {
										className: "text-rose-500 text-[10px] font-bold mt-1",
										children: errors.title
									})
								] }),
								/* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx("label", {
										className: "block text-[11px] font-black text-slate-500 mb-1.5",
										children: "Deskripsi Singkat"
									}),
									/* @__PURE__ */ jsx("textarea", {
										value: data.description,
										onChange: (e) => setData("description", e.target.value),
										required: true,
										rows: 3,
										className: "w-full bg-slate-50 border-slate-200 rounded-lg text-sm font-bold focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all px-4 py-3",
										placeholder: "Membangun REST API dengan Laravel dan MySQL..."
									}),
									errors.description && /* @__PURE__ */ jsx("div", {
										className: "text-rose-500 text-[10px] font-bold mt-1",
										children: errors.description
									})
								] }),
								/* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx("label", {
										className: "block text-[11px] font-black text-slate-500 mb-1.5",
										children: "GitHub URL"
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "relative",
										children: [/* @__PURE__ */ jsx("input", {
											type: "url",
											placeholder: "https://github.com/user/repo",
											value: data.github_url,
											onChange: (e) => setData("github_url", e.target.value),
											required: true,
											className: "w-full bg-slate-50 border-slate-200 rounded-lg text-sm font-bold focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all pl-10 pr-4 py-3"
										}), /* @__PURE__ */ jsx(Code, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" })]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-[10px] text-slate-400 font-bold mt-2 italic",
										children: "Repo Public akan diverifikasi otomatis."
									}),
									errors.github_url && /* @__PURE__ */ jsx("div", {
										className: "text-rose-500 text-[10px] font-bold mt-1",
										children: errors.github_url
									})
								] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									className: "block text-[11px] font-black text-slate-500 mb-1.5",
									children: "Demo URL (Opsional)"
								}), /* @__PURE__ */ jsx("input", {
									type: "url",
									value: data.demo_url,
									onChange: (e) => setData("demo_url", e.target.value),
									className: "w-full bg-slate-50 border-slate-200 rounded-lg text-sm font-bold focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all px-4 py-3",
									placeholder: "https://demo.vercel.app"
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx("label", {
										className: "block text-[11px] font-black text-slate-500 mb-1.5",
										children: "Tech Stack"
									}),
									/* @__PURE__ */ jsx("input", {
										type: "text",
										placeholder: "Ketik & Enter (e.g: React)",
										value: techInput,
										onChange: (e) => setTechInput(e.target.value),
										onKeyDown: handleAddTech,
										className: "w-full bg-slate-50 border-slate-200 rounded-lg text-sm font-bold focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all px-4 py-3 mb-3"
									}),
									/* @__PURE__ */ jsx("div", {
										className: "flex flex-wrap gap-2",
										children: data.tech_stack.map((tech) => /* @__PURE__ */ jsxs("span", {
											className: "bg-indigo-50 text-indigo-600 text-[10px] font-black px-2 py-1 rounded flex items-center gap-1 cursor-pointer hover:bg-rose-50 hover:text-rose-600 transition-colors border border-indigo-100",
											onClick: () => removeTech(tech),
											children: [tech, " ×"]
										}, tech))
									}),
									errors.tech_stack && /* @__PURE__ */ jsx("div", {
										className: "text-rose-500 text-[10px] font-bold mt-1",
										children: errors.tech_stack
									})
								] }),
								/* @__PURE__ */ jsx("div", {
									className: "pt-4",
									children: /* @__PURE__ */ jsx("button", {
										disabled: processing,
										className: "w-full bg-indigo-900 hover:bg-indigo-800 text-white font-black text-xs py-4 rounded-lg transition-all shadow-lg shadow-indigo-100 active:scale-95 disabled:opacity-50",
										children: processing ? "Menyimpan..." : "Simpan ke Portfolio"
									})
								})
							]
						})]
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-8 space-y-8",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-sm font-black text-slate-900",
							children: "Project Showcase"
						}), /* @__PURE__ */ jsxs("div", {
							className: "px-2.5 py-1 rounded bg-slate-100 text-slate-500 text-[10px] font-bold",
							children: [projects.length, " Projects"]
						})]
					}), projects.length === 0 ? /* @__PURE__ */ jsxs("div", {
						className: "bg-white border-2 border-dashed border-slate-100 p-16 rounded-lg text-center flex flex-col items-center justify-center",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6",
								children: /* @__PURE__ */ jsx(FolderGit2, { className: "w-8 h-8 text-slate-200" })
							}),
							/* @__PURE__ */ jsx("h4", {
								className: "text-sm font-black text-slate-900",
								children: "Belum Ada Project"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-slate-400 mt-2 max-w-xs font-medium",
								children: "Tambahkan hasil karya terbaikmu untuk membangun profil yang dilirik oleh rekruter industri."
							})
						]
					}) : /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-6",
						children: projects.map((proj) => /* @__PURE__ */ jsxs("div", {
							className: "group bg-white rounded-lg border border-slate-100 overflow-hidden flex flex-col hover:shadow-2xl hover:border-indigo-200 transition-all duration-300",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "h-44 bg-slate-50 relative overflow-hidden",
								children: [
									proj.thumbnail_url ? /* @__PURE__ */ jsx("img", {
										src: proj.thumbnail_url,
										className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
									}) : /* @__PURE__ */ jsx("div", {
										className: "w-full h-full flex items-center justify-center text-slate-200 font-black text-2xl tracking-tighter select-none p-8 text-center leading-none",
										children: proj.title
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "absolute top-4 left-4 bg-white/90 backdrop-blur-md px-2 py-1 rounded text-[10px] font-black text-slate-900 flex items-center gap-1.5 shadow-xl border border-white",
										children: [
											/* @__PURE__ */ jsx(Code, { className: "w-3 h-3 text-indigo-600" }),
											" ",
											proj.github_stars,
											" Stars"
										]
									}),
									proj.github_verified && /* @__PURE__ */ jsxs("div", {
										className: "absolute top-4 right-4 bg-teal-500 text-white px-2 py-1 rounded text-[10px] font-black flex items-center gap-1.5 shadow-xl shadow-teal-500/20",
										children: [/* @__PURE__ */ jsx(ShieldCheck, { className: "w-3 h-3" }), " Verified"]
									})
								]
							}), /* @__PURE__ */ jsxs("div", {
								className: "p-6 flex flex-col flex-1",
								children: [
									/* @__PURE__ */ jsx("h4", {
										className: "font-black text-base text-slate-900 mb-2 truncate",
										title: proj.title,
										children: proj.title
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-slate-500 text-[11px] font-medium mb-5 line-clamp-2 leading-relaxed",
										children: proj.description
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-wrap gap-1.5 mb-6",
										children: [proj.tech_stack.slice(0, 4).map((tech, i) => /* @__PURE__ */ jsx("span", {
											className: "text-[9px] font-black text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100",
											children: tech
										}, i)), proj.tech_stack.length > 4 && /* @__PURE__ */ jsxs("span", {
											className: "text-[9px] font-black text-slate-300",
											children: ["+", proj.tech_stack.length - 4]
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "mt-auto grid grid-cols-2 gap-3 pt-5 border-t border-slate-50",
										children: [
											/* @__PURE__ */ jsxs("a", {
												href: proj.github_url,
												target: "_blank",
												className: "flex items-center justify-center gap-1.5 text-[10px] font-black py-2.5 bg-slate-50 hover:bg-slate-100 rounded text-slate-600 transition-all border border-slate-100",
												children: [/* @__PURE__ */ jsx(Code, { className: "w-3.5 h-3.5" }), " Repository"]
											}),
											proj.demo_url ? /* @__PURE__ */ jsxs("a", {
												href: proj.demo_url,
												target: "_blank",
												className: "flex items-center justify-center gap-1.5 text-[10px] font-black py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded transition-all border border-indigo-100",
												children: [/* @__PURE__ */ jsx(ExternalLink, { className: "w-3.5 h-3.5" }), " Live Demo"]
											}) : /* @__PURE__ */ jsxs("button", {
												onClick: () => handleDelete(proj.id),
												className: "flex items-center justify-center gap-1.5 text-[10px] font-black py-2.5 text-rose-400 hover:bg-rose-50 rounded transition-all",
												children: [/* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" }), " Delete"]
											}),
											proj.demo_url && /* @__PURE__ */ jsxs("button", {
												onClick: () => handleDelete(proj.id),
												className: "col-span-2 mt-2 flex items-center justify-center gap-1.5 text-[9px] font-black py-1 text-slate-300 hover:text-rose-500 transition-all",
												children: [/* @__PURE__ */ jsx(Trash2, { className: "w-3 h-3" }), " Remove Project"]
											})
										]
									})
								]
							})]
						}, proj.id))
					})]
				})]
			})
		]
	})] });
}
//#endregion
//#region resources/js/Pages/Profile/Public.tsx
var Public_exports = /* @__PURE__ */ __exportAll({ default: () => PublicProfile });
function PublicProfile({ profile_user, projects, badges }) {
	const [copied, setCopied] = useState(false);
	const handleCopy = () => {
		navigator.clipboard.writeText(window.location.href);
		setCopied(true);
		setTimeout(() => setCopied(false), 2e3);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-navy-900 text-slate-300 font-sans selection:bg-teal-500/30 selection:text-white",
		children: [
			/* @__PURE__ */ jsx(Head, { title: `Portfolio | ${profile_user.name}` }),
			/* @__PURE__ */ jsx("nav", {
				className: "border-b border-slate-800 bg-navy-900/50 backdrop-blur-md sticky top-0 z-50",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-5xl mx-auto px-4 h-16 flex items-center justify-between",
					children: [/* @__PURE__ */ jsxs(Link, {
						href: "/",
						className: "font-bold text-xl tracking-tighter text-white",
						children: ["Career", /* @__PURE__ */ jsx("span", {
							className: "text-teal-500",
							children: "-Sync"
						})]
					}), /* @__PURE__ */ jsxs("button", {
						onClick: handleCopy,
						className: "flex items-center gap-2 text-sm bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition",
						children: [
							/* @__PURE__ */ jsx(Share2, { className: "w-4 h-4" }),
							" ",
							copied ? "Tersalin!" : "Bagikan Profil"
						]
					})]
				})
			}),
			/* @__PURE__ */ jsxs("main", {
				className: "max-w-5xl mx-auto px-4 py-12 space-y-12",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "bg-gradient-to-br from-slate-900 to-navy-800 border border-slate-700 p-8 rounded-3xl relative overflow-hidden",
					children: [/* @__PURE__ */ jsx("div", {
						className: "absolute top-0 right-0 p-8 opacity-10 blur-xl",
						children: /* @__PURE__ */ jsx("div", { className: "w-48 h-48 bg-teal-500 rounded-full" })
					}), /* @__PURE__ */ jsxs("div", {
						className: "relative z-10 flex flex-col md:flex-row items-center md:items-end gap-8 text-center md:text-left",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "w-32 h-32 bg-gradient-to-tr from-teal-500 to-blue-600 rounded-full flex justify-center items-center text-6xl shadow-xl shadow-teal-500/20 font-bold text-white border-4 border-navy-900",
								children: profile_user.name.charAt(0)
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex-1",
								children: [/* @__PURE__ */ jsx("h1", {
									className: "text-4xl md:text-5xl font-black text-white mb-3",
									children: profile_user.name
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap justify-center md:justify-start gap-3 mt-2",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "bg-teal-500/10 border border-teal-500/30 text-teal-300 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2",
										children: [
											/* @__PURE__ */ jsx(Briefcase, { className: "w-4 h-4" }),
											" ",
											profile_user.career_target || "Software Developer"
										]
									}), /* @__PURE__ */ jsxs("span", {
										className: "bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2",
										children: [
											/* @__PURE__ */ jsx(Award, { className: "w-4 h-4" }),
											" ",
											profile_user.rank,
											" (",
											profile_user.total_points,
											" Pts)"
										]
									})]
								})]
							}),
							profile_user.score >= 80 && /* @__PURE__ */ jsxs("div", {
								className: "bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-2xl flex flex-col items-center",
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-xs font-bold mb-1",
									children: "Status"
								}), /* @__PURE__ */ jsxs("div", {
									className: "font-black text-xl flex items-center gap-1",
									children: [/* @__PURE__ */ jsx(ShieldCheck, { className: "w-5 h-5" }), " Market Ready"]
								})]
							})
						]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 md:grid-cols-3 gap-8",
					children: [/* @__PURE__ */ jsx("div", {
						className: "md:col-span-1 space-y-6",
						children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("h3", {
							className: "text-xl font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-700 pb-2",
							children: [
								/* @__PURE__ */ jsx(Award, { className: "w-5 h-5 text-amber-400" }),
								" Pencapaian (",
								badges.length,
								")"
							]
						}), badges.length === 0 ? /* @__PURE__ */ jsx("p", {
							className: "text-sm text-slate-500 italic",
							children: "Belum ada badge."
						}) : /* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3",
							children: badges.map((b) => /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-1 bg-slate-800/50 p-3 rounded-xl border border-slate-700 hover:border-slate-500 transition",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ jsx("div", {
										className: "text-2xl",
										children: b.emoji
									}), /* @__PURE__ */ jsx("div", {
										className: "font-bold text-sm text-slate-200",
										children: b.name
									})]
								}), /* @__PURE__ */ jsx("div", {
									className: "text-xs text-slate-400 pl-[44px]",
									children: b.description
								})]
							}, b.id))
						})] })
					}), /* @__PURE__ */ jsxs("div", {
						className: "md:col-span-2 space-y-6",
						children: [/* @__PURE__ */ jsxs("h3", {
							className: "text-xl font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-700 pb-2",
							children: [/* @__PURE__ */ jsx(Code, { className: "w-5 h-5 text-slate-300" }), " Project Showcase"]
						}), projects.length === 0 ? /* @__PURE__ */ jsx("div", {
							className: "bg-slate-800/50 p-8 rounded-xl border border-slate-700 text-center",
							children: /* @__PURE__ */ jsx("p", {
								className: "text-slate-400",
								children: "Belum ada project public."
							})
						}) : /* @__PURE__ */ jsx("div", {
							className: "space-y-6",
							children: projects.map((proj) => /* @__PURE__ */ jsxs("div", {
								className: "bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden flex flex-col sm:flex-row hover:border-slate-500 transition",
								children: [/* @__PURE__ */ jsx("div", {
									className: "w-full sm:w-1/3 bg-slate-900 border-b sm:border-b-0 sm:border-r border-slate-700 relative h-48 sm:h-auto",
									children: proj.thumbnail_url ? /* @__PURE__ */ jsx("img", {
										src: proj.thumbnail_url,
										className: "w-full h-full object-cover opacity-80"
									}) : /* @__PURE__ */ jsx("div", {
										className: "w-full h-full flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 to-navy-900 font-bold text-slate-600",
										children: proj.title
									})
								}), /* @__PURE__ */ jsxs("div", {
									className: "w-full sm:w-2/3 p-6 flex flex-col",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex justify-between items-start mb-2",
											children: [/* @__PURE__ */ jsx("h4", {
												className: "font-bold text-xl text-white leading-tight",
												children: proj.title
											}), proj.github_verified && /* @__PURE__ */ jsx("span", {
												title: "Terverifikasi oleh GitHub Data",
												className: "text-teal-400 bg-teal-500/10 p-1 rounded border border-teal-500/20 shrink-0",
												children: /* @__PURE__ */ jsx(ShieldCheck, { className: "w-4 h-4" })
											})]
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm text-slate-400 mb-4",
											children: proj.description
										}),
										/* @__PURE__ */ jsx("div", {
											className: "flex flex-wrap gap-2 mb-6",
											children: proj.tech_stack.map((tech, i) => /* @__PURE__ */ jsx("span", {
												className: "text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-md font-mono",
												children: tech
											}, i))
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "mt-auto flex gap-3 pt-4 border-t border-slate-700/50",
											children: [/* @__PURE__ */ jsxs("a", {
												href: proj.github_url,
												target: "_blank",
												className: "text-sm font-medium text-white bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg flex items-center gap-2 transition",
												children: [/* @__PURE__ */ jsx(Code, { className: "w-4 h-4" }), " Source"]
											}), proj.demo_url && /* @__PURE__ */ jsxs("a", {
												href: proj.demo_url,
												target: "_blank",
												className: "text-sm font-medium text-navy-900 bg-teal-400 hover:bg-teal-300 px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-lg shadow-teal-500/20",
												children: [/* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4" }), " Kunjungi App"]
											})]
										})
									]
								})]
							}, proj.id))
						})]
					})]
				})]
			})
		]
	});
}
//#endregion
//#region resources/js/Pages/Profile.tsx
var Profile_exports = /* @__PURE__ */ __exportAll({ default: () => Profile });
function Profile({ mustVerifyEmail, status, profile, roles }) {
	const { auth } = usePage().props;
	const identityForm = useForm({
		name: auth.user.name,
		email: auth.user.email
	});
	const careerForm = useForm({
		career_target: profile?.career_target || [],
		skills: profile?.skills || []
	});
	const [tempSkill, setTempSkill] = useState("");
	const handleIdentitySubmit = (e) => {
		e.preventDefault();
		identityForm.patch(route("profile.update"));
	};
	const handleCareerSubmit = (e) => {
		e.preventDefault();
		careerForm.post(route("profile.career.update"));
	};
	const toggleRole = (role) => {
		const current = [...careerForm.data.career_target];
		if (current.includes(role)) careerForm.setData("career_target", current.filter((r) => r !== role));
		else careerForm.setData("career_target", [...current, role]);
	};
	const addSkill = (e) => {
		e.preventDefault();
		if (tempSkill.trim()) {
			const newSkill = {
				name: tempSkill.trim(),
				level: "intermediate"
			};
			if (!careerForm.data.skills.find((s) => s.name.toLowerCase() === newSkill.name.toLowerCase())) careerForm.setData("skills", [...careerForm.data.skills, newSkill]);
			setTempSkill("");
		}
	};
	const removeSkill = (skillName) => {
		careerForm.setData("skills", careerForm.data.skills.filter((s) => s.name !== skillName));
	};
	return /* @__PURE__ */ jsxs(AppLayout, {
		header: "Profil & Pengaturan",
		children: [/* @__PURE__ */ jsx(Head, { title: "Profil Saya" }), /* @__PURE__ */ jsxs("div", {
			className: "space-y-8",
			children: [
				/* @__PURE__ */ jsxs("section", {
					className: "bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "p-6 border-b border-slate-50 flex items-center gap-3",
						children: [/* @__PURE__ */ jsx("div", {
							className: "w-10 h-10 bg-navy-50 text-navy-600 rounded-xl flex items-center justify-center",
							children: /* @__PURE__ */ jsx(User, { className: "w-5 h-5" })
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
							className: "font-bold text-navy-900",
							children: "Informasi Pengguna"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-slate-500",
							children: "Perbarui informasi dasar akun Anda."
						})] })]
					}), /* @__PURE__ */ jsxs("form", {
						onSubmit: handleIdentitySubmit,
						className: "p-8",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "grid md:grid-cols-2 gap-6 mb-8",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "block text-xs font-black text-slate-400 uppercase tracking-widest mb-2",
								children: "Nama Lengkap"
							}), /* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx(User, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }), /* @__PURE__ */ jsx("input", {
									type: "text",
									value: identityForm.data.name,
									onChange: (e) => identityForm.setData("name", e.target.value),
									className: "w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-teal-500 font-medium"
								})]
							})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "block text-xs font-black text-slate-400 uppercase tracking-widest mb-2",
								children: "Alamat Email"
							}), /* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx(Mail, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }), /* @__PURE__ */ jsx("input", {
									type: "email",
									value: identityForm.data.email,
									onChange: (e) => identityForm.setData("email", e.target.value),
									className: "w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-teal-500 font-medium"
								})]
							})] })]
						}), /* @__PURE__ */ jsx("div", {
							className: "flex justify-end",
							children: /* @__PURE__ */ jsxs("button", {
								type: "submit",
								disabled: identityForm.processing,
								className: "flex items-center gap-2 px-6 py-3 bg-navy-900 text-white rounded-xl font-bold hover:scale-105 transition-transform disabled:opacity-50",
								children: [/* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }), "Simpan Perubahan"]
							})
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("section", {
					className: "bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "p-6 border-b border-slate-50 flex items-center gap-3",
						children: [/* @__PURE__ */ jsx("div", {
							className: "w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center",
							children: /* @__PURE__ */ jsx(Target, { className: "w-5 h-5" })
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
							className: "font-bold text-navy-900",
							children: "Target Karir"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-slate-500",
							children: "Pilih role yang ingin Anda fokuskan."
						})] })]
					}), /* @__PURE__ */ jsxs("div", {
						className: "p-8",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "grid grid-cols-2 md:grid-cols-4 gap-3 mb-8",
								children: roles.map((role) => {
									const isSelected = careerForm.data.career_target.includes(role);
									return /* @__PURE__ */ jsx("button", {
										onClick: () => toggleRole(role),
										className: `px-4 py-4 rounded-xl border-2 text-sm font-bold transition-all ${isSelected ? "border-teal-500 bg-teal-50 text-teal-700" : "border-slate-50 bg-slate-50 text-slate-500 hover:border-slate-200"}`,
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between",
											children: [role, isSelected && /* @__PURE__ */ jsx(Check, { className: "w-4 h-4" })]
										})
									}, role);
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mb-8 p-6 bg-slate-50 rounded-2xl",
								children: [
									/* @__PURE__ */ jsx("label", {
										className: "block text-xs font-black text-slate-400 uppercase tracking-widest mb-4",
										children: "Daftar Skill Saat Ini"
									}),
									/* @__PURE__ */ jsxs("form", {
										onSubmit: addSkill,
										className: "flex gap-2 mb-6",
										children: [/* @__PURE__ */ jsx("input", {
											type: "text",
											value: tempSkill,
											onChange: (e) => setTempSkill(e.target.value),
											placeholder: "Tambah skill baru...",
											className: "flex-1 px-4 py-3 bg-white border-none rounded-xl focus:ring-2 focus:ring-teal-500 font-medium"
										}), /* @__PURE__ */ jsx("button", {
											type: "submit",
											className: "p-3 bg-navy-900 text-white rounded-xl hover:scale-105 transition-transform",
											children: /* @__PURE__ */ jsx(Plus, { className: "w-5 h-5" })
										})]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "flex flex-wrap gap-2",
										children: careerForm.data.skills.map((skill) => /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-navy-900 shadow-sm animate-in zoom-in duration-200",
											children: [skill.name, /* @__PURE__ */ jsx("button", {
												onClick: () => removeSkill(skill.name),
												className: "text-slate-400 hover:text-red-500 transition-colors",
												children: /* @__PURE__ */ jsx(X, { className: "w-3 h-3" })
											})]
										}, skill.name))
									})
								]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex justify-end",
								children: /* @__PURE__ */ jsxs("button", {
									onClick: handleCareerSubmit,
									disabled: careerForm.processing,
									className: "flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-xl font-bold hover:scale-105 transition-transform disabled:opacity-50 shadow-lg shadow-teal-500/20",
									children: [/* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }), "Update Karir & Skill"]
								})
							})
						]
					})]
				}),
				/* @__PURE__ */ jsxs("section", {
					className: "bg-red-50/50 rounded-3xl border border-red-100 p-8",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-4 mb-6 text-red-600",
						children: [/* @__PURE__ */ jsx(AlertCircle, { className: "w-6 h-6" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
							className: "font-bold",
							children: "Zona Bahaya"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm opacity-80",
							children: "Menghapus akun akan menghilangkan semua data analisis dan progres Anda secara permanen."
						})] })]
					}), /* @__PURE__ */ jsx("button", {
						className: "px-6 py-3 bg-white border border-red-200 text-red-600 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-all",
						children: "Hapus Akun"
					})]
				})
			]
		})]
	});
}
//#endregion
//#region resources/js/Pages/ProfileDetail.tsx
var ProfileDetail_exports = /* @__PURE__ */ __exportAll({ default: () => ProfileDetail });
function ProfileDetail({ profile }) {
	const { data, setData, put, processing } = useForm({
		headline: profile.headline ?? "",
		bio: profile.bio ?? "",
		location: profile.location ?? "",
		phone: profile.phone ?? "",
		linkedin: profile.linkedin ?? "",
		github: profile.github ?? ""
	});
	const submit = (e) => {
		e.preventDefault();
		put(route("profile.details.update"));
	};
	return /* @__PURE__ */ jsxs(AppLayout, {
		header: "Profile Detail",
		children: [/* @__PURE__ */ jsx(Head, { title: "Profile Detail | Kembangin" }), /* @__PURE__ */ jsx("div", {
			className: "max-w-3xl mx-auto",
			children: /* @__PURE__ */ jsxs("form", {
				onSubmit: submit,
				className: "bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
						className: "text-lg font-bold text-[#1A1A2E]",
						children: "Detail Profil"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-sm text-slate-500",
						children: "Lengkapi informasi profilmu."
					})] }),
					/* @__PURE__ */ jsxs("label", {
						className: "text-sm font-semibold text-[#1A1A2E]",
						children: ["Headline", /* @__PURE__ */ jsx("input", {
							value: data.headline,
							onChange: (e) => setData("headline", e.target.value),
							className: "mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm",
							placeholder: "Frontend Engineer"
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "text-sm font-semibold text-[#1A1A2E]",
						children: ["Bio", /* @__PURE__ */ jsx("textarea", {
							value: data.bio,
							onChange: (e) => setData("bio", e.target.value),
							className: "mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm min-h-[120px]"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
						children: [/* @__PURE__ */ jsxs("label", {
							className: "text-sm font-semibold text-[#1A1A2E]",
							children: ["Lokasi", /* @__PURE__ */ jsx("input", {
								value: data.location,
								onChange: (e) => setData("location", e.target.value),
								className: "mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm",
								placeholder: "Jakarta"
							})]
						}), /* @__PURE__ */ jsxs("label", {
							className: "text-sm font-semibold text-[#1A1A2E]",
							children: ["Telepon", /* @__PURE__ */ jsx("input", {
								value: data.phone,
								onChange: (e) => setData("phone", e.target.value),
								className: "mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm",
								placeholder: "08xxxxxxxxxx"
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
						children: [/* @__PURE__ */ jsxs("label", {
							className: "text-sm font-semibold text-[#1A1A2E]",
							children: ["LinkedIn", /* @__PURE__ */ jsx("input", {
								value: data.linkedin,
								onChange: (e) => setData("linkedin", e.target.value),
								className: "mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm",
								placeholder: "https://linkedin.com/in/..."
							})]
						}), /* @__PURE__ */ jsxs("label", {
							className: "text-sm font-semibold text-[#1A1A2E]",
							children: ["GitHub", /* @__PURE__ */ jsx("input", {
								value: data.github,
								onChange: (e) => setData("github", e.target.value),
								className: "mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm",
								placeholder: "https://github.com/..."
							})]
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex justify-end",
						children: /* @__PURE__ */ jsx("button", {
							type: "submit",
							disabled: processing,
							className: "bg-indigo-900 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-indigo-900 transition-colors",
							children: "Simpan Profil"
						})
					})
				]
			})
		})]
	});
}
//#endregion
//#region resources/js/Pages/Roadmap.tsx
var Roadmap_exports = /* @__PURE__ */ __exportAll({ default: () => Roadmap });
function Roadmap({ roadmap, profile }) {
	const [selectedMilestone, setSelectedMilestone] = useState(null);
	const [loading, setLoading] = useState(false);
	const [loadingDetails, setLoadingDetails] = useState(false);
	const [progress, setProgress] = useState(0);
	useEffect(() => {
		let interval;
		if (loading || loadingDetails) {
			setProgress(0);
			interval = setInterval(() => {
				setProgress((prev) => {
					if (prev >= 90) return prev;
					return prev + (prev < 50 ? 5 : 2);
				});
			}, 300);
		} else {
			setProgress(100);
			setTimeout(() => setProgress(0), 500);
		}
		return () => clearInterval(interval);
	}, [loading, loadingDetails]);
	useEffect(() => {
		if (!roadmap?.roadmap_data?.milestones) return;
		if (!selectedMilestone) {
			setSelectedMilestone(roadmap.roadmap_data.milestones.find((m) => m.status === "current") || roadmap.roadmap_data.milestones[0] || null);
			return;
		}
		const updated = roadmap.roadmap_data.milestones.find((m) => m.id === selectedMilestone.id);
		if (updated) setSelectedMilestone(updated);
	}, [roadmap]);
	const handleSelect = async (ms) => {
		setSelectedMilestone(ms);
		if (!ms.resources || ms.resources.length === 0 || !ms.why_important) {
			setLoadingDetails(true);
			try {
				setSelectedMilestone((await axios.get(route("roadmap.milestone.details", {
					roadmapId: roadmap.id,
					milestoneId: ms.id
				}))).data);
				router.reload({ only: ["roadmap"] });
			} catch (error) {
				console.error("Gagal mengambil detail milestone:", error);
			} finally {
				setLoadingDetails(false);
			}
		}
	};
	const handleGenerate = () => {
		setLoading(true);
		router.post(route("roadmap.generate"), {}, { onFinish: () => setLoading(false) });
	};
	const milestones = useMemo(() => roadmap?.roadmap_data?.milestones || [], [roadmap]);
	const completion = roadmap?.total_milestones ? Math.round(roadmap.milestones_completed / roadmap.total_milestones * 100) : 0;
	return /* @__PURE__ */ jsxs(AppLayout, {
		header: "Learning Roadmap",
		children: [/* @__PURE__ */ jsx(Head, { title: "Roadmap | Kembangin" }), !roadmap ? /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col items-center justify-center py-12 md:py-20 bg-white rounded-lg md:rounded-lg border border-slate-100 shadow-sm text-center px-4 md:px-6",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "w-20 h-20 md:w-24 md:h-24 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900 mb-6 md:mb-8",
					children: /* @__PURE__ */ jsx(Map, { className: "w-10 h-10 md:w-12 md:h-12" })
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "text-2xl md:text-3xl font-black text-navy-900 mb-4 px-2",
					children: "Gunakan AI untuk Memandu Karirmu"
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "max-w-md text-slate-500 mb-8 md:mb-10 text-sm md:text-base",
					children: [
						"AI akan menganalisis ",
						/* @__PURE__ */ jsx("b", { children: "skill gap" }),
						" kamu dan membuatkan rencana belajar untuk menutupinya."
					]
				}),
				/* @__PURE__ */ jsxs("button", {
					onClick: handleGenerate,
					disabled: loading,
					className: "relative overflow-hidden w-full sm:w-auto px-8 py-4 bg-navy-900 text-white rounded-lg font-black flex items-center justify-center gap-3 shadow-xl shadow-navy-900/20 hover:scale-105 transition-all disabled:opacity-50",
					children: [
						loading && /* @__PURE__ */ jsx("div", {
							className: "absolute bottom-0 left-0 h-1.5 bg-teal-400 transition-all duration-300 shadow-[0_0_10px_rgba(45,212,191,0.5)]",
							style: { width: `${progress}%` }
						}),
						loading ? /* @__PURE__ */ jsx(Loader2, { className: "w-6 h-6 animate-spin" }) : /* @__PURE__ */ jsx(Sparkles, { className: "w-6 h-6" }),
						loading ? `Menganalisis... ${progress}%` : "Generate Target Roadmap"
					]
				})
			]
		}) : /* @__PURE__ */ jsx("div", {
			className: "rounded-lg md:rounded-lg bg-slate-200/50 p-2 md:p-4 border border-slate-200 max-w-full overflow-hidden",
			children: /* @__PURE__ */ jsxs("div", {
				className: "rounded-lg md:rounded-lg bg-white/80 p-3 md:p-4 space-y-3 md:space-y-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-lg bg-white p-3 md:p-4 border border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "text-xl font-black text-slate-900 leading-tight",
								children: "Adaptive Learning Roadmap"
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-wrap items-center gap-2 mt-1",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg",
									children: [
										/* @__PURE__ */ jsx(Target, { className: "w-3 h-3 text-blue-600" }),
										"Target: ",
										roadmap.career_target
									]
								}), /* @__PURE__ */ jsx("span", {
									className: "text-[11px] text-slate-400 font-medium",
									children: "Ciptakan jalur belajar sesuai skill gap kamu."
								})]
							})]
						}), /* @__PURE__ */ jsxs("button", {
							onClick: handleGenerate,
							disabled: loading,
							className: "relative overflow-hidden px-5 py-2.5 bg-indigo-900 text-white rounded-lg font-bold text-xs hover:bg-indigo-800 transition-colors disabled:opacity-60 shrink-0",
							children: [loading && /* @__PURE__ */ jsx("div", {
								className: "absolute left-0 bottom-0 h-1 bg-cyan-300 transition-all duration-300",
								style: { width: `${progress}%` }
							}), /* @__PURE__ */ jsxs("span", {
								className: "inline-flex items-center gap-2",
								children: [loading ? /* @__PURE__ */ jsx(Loader2, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5" }), loading ? `Updating ${progress}%` : "Regenerate"]
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-lg bg-white p-3 border border-slate-100",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between mb-2",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-[10px] font-bold text-slate-400",
								children: "Overall Progress"
							}), /* @__PURE__ */ jsxs("span", {
								className: "text-xs font-black text-indigo-900",
								children: [completion, "%"]
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "h-2 bg-slate-100 rounded-lg overflow-hidden",
							children: /* @__PURE__ */ jsx("div", {
								className: "h-full bg-indigo-900 transition-all duration-700",
								style: { width: `${completion}%` }
							})
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "overflow-x-auto pb-2 scrollbar-hide",
						children: /* @__PURE__ */ jsx("div", {
							className: "flex gap-3 min-w-max px-1",
							children: milestones.map((ms) => {
								const status = ms.status || "locked";
								const isCurrent = status === "current";
								const isCompleted = status === "completed";
								const isActive = selectedMilestone?.id === ms.id;
								return /* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: () => handleSelect(ms),
									className: `w-48 md:w-56 min-h-[100px] rounded-lg p-3 text-left transition-all border shrink-0 ${isActive ? "bg-indigo-900 border-indigo-300 text-white shadow-lg ring-2 ring-indigo-200" : isCompleted ? "bg-indigo-900/90 border-indigo-400 text-white" : isCurrent ? "bg-indigo-900 border-indigo-500 text-white" : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"}`,
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-start justify-between gap-2",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-2xl leading-none",
												children: ms.emoji || "•"
											}), /* @__PURE__ */ jsxs("div", {
												className: "p-1 rounded-md bg-white/10",
												children: [
													isCompleted && /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3.5 h-3.5" }),
													isCurrent && /* @__PURE__ */ jsx(PlayCircle, { className: "w-3.5 h-3.5" }),
													status === "locked" && /* @__PURE__ */ jsx(Lock, { className: "w-3.5 h-3.5" })
												]
											})]
										}),
										/* @__PURE__ */ jsx("p", {
											className: "mt-2 font-black text-[12px] leading-tight line-clamp-2",
											children: ms.title
										}),
										/* @__PURE__ */ jsx("p", {
											className: `mt-1 text-[9px] font-bold ${isActive || isCurrent || isCompleted ? "text-white/60" : "text-slate-400"}`,
											children: isCompleted ? "Selesai" : isCurrent ? "Sedang dipelajari" : "Terkunci"
										})
									]
								}, ms.id);
							})
						})
					}),
					selectedMilestone && /* @__PURE__ */ jsxs("div", {
						className: "rounded-lg bg-white p-4 md:p-5 border border-slate-100 max-h-[500px] overflow-y-auto custom-scrollbar",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5 pb-5 border-b border-slate-100",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
								className: "text-xl font-black text-slate-900 leading-tight",
								children: selectedMilestone.title
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-wrap items-center gap-2 mt-2",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-[10px] font-bold text-slate-400",
									children: "Skill Focus:"
								}), selectedMilestone.skill_gaps_addressed?.map((s) => /* @__PURE__ */ jsx("span", {
									className: "px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-bold",
									children: s
								}, s)) || /* @__PURE__ */ jsx("span", {
									className: "text-[10px] text-slate-500 italic",
									children: "Umum"
								})]
							})] }), (selectedMilestone.status === "current" || selectedMilestone.status === "completed") && /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col items-end gap-1",
								children: [/* @__PURE__ */ jsx(Link, {
									href: route("roadmap.complete", selectedMilestone.id),
									method: "patch",
									as: "button",
									className: `px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0 ${selectedMilestone.status === "completed" ? "bg-emerald-500 text-white" : "bg-indigo-900 text-white hover:bg-indigo-800"}`,
									children: selectedMilestone.status === "completed" ? "Sudah Selesai" : "Selesaikan Milestone"
								}), selectedMilestone.status === "current" && selectedMilestone.capstone_project && /* @__PURE__ */ jsx("span", {
									className: "text-[9px] text-slate-400 font-bold italic",
									children: "*Butuh Capstone Project"
								})]
							})]
						}), loadingDetails ? /* @__PURE__ */ jsxs("div", {
							className: "py-12 text-center",
							children: [/* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 animate-spin text-indigo-900 mx-auto mb-3" }), /* @__PURE__ */ jsx("p", {
								className: "text-sm font-bold text-slate-600",
								children: "Menyusun strategi belajar terbaik..."
							})]
						}) : /* @__PURE__ */ jsxs("div", {
							className: "space-y-6",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "rounded-lg bg-indigo-900/5 p-4 border border-indigo-100",
									children: [/* @__PURE__ */ jsxs("h5", {
										className: "text-[11px] font-black text-indigo-900 mb-2 flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5" }), "Strategi Belajar"]
									}), /* @__PURE__ */ jsx("p", {
										className: "text-[13px] text-slate-700 leading-relaxed font-medium",
										children: selectedMilestone.why_important || "Milestone ini membantu kamu memperkuat kompetensi inti secara bertahap."
									})]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "grid grid-cols-1 md:grid-cols-2 gap-4",
									children: (selectedMilestone.resources || []).map((res, i) => {
										const isYoutube = res.type === "youtube";
										return /* @__PURE__ */ jsxs("a", {
											href: res.url,
											target: "_blank",
											rel: "noreferrer",
											className: "group flex flex-col bg-white border border-slate-100 rounded-lg overflow-hidden transition-all hover:shadow-xl hover:border-indigo-200 hover:-translate-y-1",
											children: [isYoutube && res.thumbnail && /* @__PURE__ */ jsxs("div", {
												className: "relative aspect-video overflow-hidden bg-slate-100",
												children: [
													/* @__PURE__ */ jsx("img", {
														src: res.thumbnail,
														alt: res.title,
														className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
													}),
													/* @__PURE__ */ jsx("div", {
														className: "absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center",
														children: /* @__PURE__ */ jsx("div", {
															className: "w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 transform transition-transform group-hover:scale-110",
															children: /* @__PURE__ */ jsx(PlayCircle, { className: "w-6 h-6 fill-white" })
														})
													}),
													/* @__PURE__ */ jsx("div", {
														className: "absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-bold",
														children: "Video"
													})
												]
											}), /* @__PURE__ */ jsxs("div", {
												className: "p-4 flex flex-col flex-1",
												children: [
													/* @__PURE__ */ jsxs("div", {
														className: "flex items-center gap-2 mb-2",
														children: [isYoutube ? /* @__PURE__ */ jsx("div", {
															className: "px-2 py-0.5 rounded-lg bg-rose-50 text-rose-600 text-[9px] font-black border border-rose-100",
															children: "YouTube"
														}) : /* @__PURE__ */ jsx("div", {
															className: "px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-600 text-[9px] font-black border border-indigo-100",
															children: "Article"
														}), res.channel && /* @__PURE__ */ jsx("span", {
															className: "text-[10px] font-bold text-slate-400 truncate flex-1 tracking-tight",
															children: res.channel
														})]
													}),
													/* @__PURE__ */ jsx("h6", {
														className: "text-[13px] font-black text-slate-900 line-clamp-2 leading-snug group-hover:text-indigo-900 transition-colors",
														children: res.title
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "mt-auto pt-4 flex items-center justify-between",
														children: [/* @__PURE__ */ jsxs("span", {
															className: "text-[10px] font-bold text-indigo-500 flex items-center gap-1 group-hover:gap-2 transition-all",
															children: [isYoutube ? "Tonton Materi" : "Baca Materi", /* @__PURE__ */ jsx(ExternalLink, { className: "w-3 h-3" })]
														}), res.verified && /* @__PURE__ */ jsx("div", {
															className: "px-1.5 py-0.5 rounded-full bg-teal-50 text-teal-600 text-[8px] font-black",
															children: "Verified"
														})]
													})
												]
											})]
										}, i);
									})
								}),
								selectedMilestone.capstone_project && /* @__PURE__ */ jsxs("div", {
									className: "rounded-lg bg-linear-to-br from-indigo-900 to-navy-900 text-white p-5 shadow-xl",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2 mb-3",
											children: [/* @__PURE__ */ jsx("div", {
												className: "p-1.5 rounded-lg bg-white/10",
												children: /* @__PURE__ */ jsx(Target, { className: "w-4 h-4 text-cyan-300" })
											}), /* @__PURE__ */ jsx("h5", {
												className: "text-[11px] font-black text-cyan-300",
												children: "Capstone Project"
											})]
										}),
										/* @__PURE__ */ jsx("h6", {
											className: "text-lg font-black leading-tight mb-2",
											children: selectedMilestone.capstone_project.title
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-[13px] text-indigo-100/80 leading-relaxed mb-4",
											children: selectedMilestone.capstone_project.description
										}),
										/* @__PURE__ */ jsx("div", {
											className: "flex flex-wrap gap-2 mb-5",
											children: selectedMilestone.capstone_project.tech_used?.map((tech) => /* @__PURE__ */ jsx("span", {
												className: "px-2 py-0.5 rounded bg-white/10 border border-white/10 text-[9px] font-bold text-white/90",
												children: tech
											}, tech))
										}),
										/* @__PURE__ */ jsx("div", {
											className: "pt-4 border-t border-white/10",
											children: /* @__PURE__ */ jsxs(Link, {
												href: `/roadmap/${roadmap.id}/capstone/${selectedMilestone.id}`,
												className: `inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-black transition-all ${selectedMilestone.status === "completed" ? "bg-emerald-500 text-white hover:bg-emerald-600" : "bg-white text-indigo-900 hover:bg-cyan-50"}`,
												children: [selectedMilestone.status === "completed" ? "View Submission" : "Start Project", /* @__PURE__ */ jsx(ExternalLink, { className: "w-3 h-3" })]
											})
										})
									]
								}),
								selectedMilestone.status === "locked" && /* @__PURE__ */ jsx("p", {
									className: "text-xs font-bold text-slate-400 italic",
									children: "Selesaikan milestone sebelumnya untuk membuka proyek ini."
								})
							]
						})]
					})
				]
			})
		})]
	});
}
//#endregion
//#region resources/js/Pages/Settings.tsx
var Settings_exports = /* @__PURE__ */ __exportAll({ default: () => Settings$1 });
function Settings$1({ settings }) {
	const { data, setData, put, processing } = useForm({
		email_notifications: settings.email_notifications ?? true,
		product_updates: settings.product_updates ?? true,
		weekly_summary: settings.weekly_summary ?? true,
		language: settings.language ?? "id",
		timezone: settings.timezone ?? "Asia/Jakarta"
	});
	const submit = (e) => {
		e.preventDefault();
		put(route("settings.update"));
	};
	return /* @__PURE__ */ jsxs(AppLayout, {
		header: "Settings",
		children: [/* @__PURE__ */ jsx(Head, { title: "Settings | Kembangin" }), /* @__PURE__ */ jsx("div", {
			className: "max-w-3xl mx-auto",
			children: /* @__PURE__ */ jsxs("form", {
				onSubmit: submit,
				className: "bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
						className: "text-lg font-bold text-[#1A1A2E]",
						children: "Preferensi Notifikasi"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-sm text-slate-500",
						children: "Atur notifikasi yang ingin kamu terima."
					})] }),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ jsxs("label", {
								className: "flex items-center justify-between gap-4",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-sm font-semibold text-[#1A1A2E]",
									children: "Email Notifications"
								}), /* @__PURE__ */ jsx("input", {
									type: "checkbox",
									checked: data.email_notifications,
									onChange: (e) => setData("email_notifications", e.target.checked),
									className: "h-5 w-5 accent-blue-600"
								})]
							}),
							/* @__PURE__ */ jsxs("label", {
								className: "flex items-center justify-between gap-4",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-sm font-semibold text-[#1A1A2E]",
									children: "Product Updates"
								}), /* @__PURE__ */ jsx("input", {
									type: "checkbox",
									checked: data.product_updates,
									onChange: (e) => setData("product_updates", e.target.checked),
									className: "h-5 w-5 accent-blue-600"
								})]
							}),
							/* @__PURE__ */ jsxs("label", {
								className: "flex items-center justify-between gap-4",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-sm font-semibold text-[#1A1A2E]",
									children: "Weekly Summary"
								}), /* @__PURE__ */ jsx("input", {
									type: "checkbox",
									checked: data.weekly_summary,
									onChange: (e) => setData("weekly_summary", e.target.checked),
									className: "h-5 w-5 accent-blue-600"
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
						children: [/* @__PURE__ */ jsxs("label", {
							className: "text-sm font-semibold text-[#1A1A2E]",
							children: ["Language", /* @__PURE__ */ jsxs("select", {
								value: data.language,
								onChange: (e) => setData("language", e.target.value),
								className: "mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm",
								children: [/* @__PURE__ */ jsx("option", {
									value: "id",
									children: "Bahasa Indonesia"
								}), /* @__PURE__ */ jsx("option", {
									value: "en",
									children: "English"
								})]
							})]
						}), /* @__PURE__ */ jsxs("label", {
							className: "text-sm font-semibold text-[#1A1A2E]",
							children: ["Timezone", /* @__PURE__ */ jsxs("select", {
								value: data.timezone,
								onChange: (e) => setData("timezone", e.target.value),
								className: "mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm",
								children: [
									/* @__PURE__ */ jsx("option", {
										value: "Asia/Jakarta",
										children: "Asia/Jakarta"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "Asia/Makassar",
										children: "Asia/Makassar"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "Asia/Jayapura",
										children: "Asia/Jayapura"
									})
								]
							})]
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex justify-end",
						children: /* @__PURE__ */ jsx("button", {
							type: "submit",
							disabled: processing,
							className: "bg-indigo-900 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-indigo-900 transition-colors",
							children: "Simpan Settings"
						})
					})
				]
			})
		})]
	});
}
//#endregion
//#region resources/js/Pages/Welcome.tsx
var Welcome_exports = /* @__PURE__ */ __exportAll({ default: () => Welcome });
var FloatingCard = ({ children, className, delay = 0 }) => {
	return /* @__PURE__ */ jsx("div", {
		className: `absolute p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl animate-bounce-slow ${className}`,
		style: { animationDelay: `${delay}s` },
		children
	});
};
var StatCounter = ({ end, duration = 1500, label }) => {
	const [count, setCount] = useState(0);
	useEffect(() => {
		let startTimestamp = null;
		const step = (timestamp) => {
			if (!startTimestamp) startTimestamp = timestamp;
			const progress = Math.min((timestamp - startTimestamp) / duration, 1);
			setCount(Math.floor(progress * end));
			if (progress < 1) window.requestAnimationFrame(step);
		};
		window.requestAnimationFrame(step);
	}, [end, duration]);
	return /* @__PURE__ */ jsxs("div", {
		className: "text-center",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "text-4xl md:text-5xl font-extrabold text-navy-900 mb-2",
			children: [count.toLocaleString(), "+"]
		}), /* @__PURE__ */ jsx("div", {
			className: "text-slate-500 font-medium text-sm tracking-wide uppercase",
			children: label
		})]
	});
};
function Welcome({ auth }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "bg-white selection:bg-teal-100 selection:text-teal-900 overflow-hidden",
		children: [
			/* @__PURE__ */ jsx(Head, { title: "Selamat Datang di Kembangin" }),
			/* @__PURE__ */ jsx("nav", {
				className: "fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("div", {
								className: "w-10 h-10 bg-linear-to-tr from-navy-900 to-navy-700 rounded-xl flex items-center justify-center p-2 shadow-lg",
								children: /* @__PURE__ */ jsx(TrendingUp, { className: "text-teal-400" })
							}), /* @__PURE__ */ jsx("span", {
								className: "text-2xl font-black text-navy-900 tracking-tighter",
								children: "Kembangin"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "hidden md:flex items-center gap-10",
							children: [
								/* @__PURE__ */ jsx("a", {
									href: "#features",
									className: "text-sm font-semibold text-slate-600 hover:text-navy-900 transition-colors",
									children: "Fitur"
								}),
								/* @__PURE__ */ jsx("a", {
									href: "#how-it-works",
									className: "text-sm font-semibold text-slate-600 hover:text-navy-900 transition-colors",
									children: "Cara Kerja"
								}),
								/* @__PURE__ */ jsx(Link, {
									href: route("demo"),
									className: "text-sm font-semibold text-slate-600 hover:text-navy-900 transition-colors",
									children: "Demo"
								})
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "flex items-center gap-4",
							children: auth.user ? /* @__PURE__ */ jsx(Link, {
								href: route("dashboard"),
								className: "px-6 py-2.5 bg-navy-900 text-white rounded-xl font-bold text-sm shadow-xl shadow-navy-900/20 hover:scale-105 transition-transform active:scale-95",
								children: "Dashboard"
							}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Link, {
								href: route("login"),
								className: "hidden sm:block text-sm font-bold text-navy-900",
								children: "Login"
							}), /* @__PURE__ */ jsx(Link, {
								href: route("register"),
								className: "px-6 py-2.5 bg-navy-900 text-white rounded-xl font-bold text-sm shadow-xl shadow-navy-900/20 hover:scale-105 transition-transform active:scale-95",
								children: "Mulai Gratis"
							})] })
						})
					]
				})
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "relative pt-40 pb-20 md:pt-48 md:pb-32 px-4 overflow-visible",
				children: [
					/* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 bg-[radial-gradient(circle_at_top,var(--color-teal-100)_0%,transparent_50%)] opacity-40" }),
					/* @__PURE__ */ jsx("div", { className: "absolute top-40 right-10 w-64 h-64 bg-teal-300/20 rounded-full blur-3xl -z-10 animate-pulse" }),
					/* @__PURE__ */ jsx("div", { className: "absolute bottom-20 left-10 w-80 h-80 bg-navy-400/10 rounded-full blur-3xl -z-10" }),
					/* @__PURE__ */ jsxs("div", {
						className: "max-w-7xl mx-auto flex flex-col items-center text-center",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-100 rounded-full text-teal-700 text-xs font-bold tracking-widest uppercase mb-8 animate-in fade-in slide-in-from-bottom duration-500",
								children: [/* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5" }), "AI-Powered Career Intelligence 2026"]
							}),
							/* @__PURE__ */ jsxs("h1", {
								className: "text-5xl md:text-7xl font-extrabold text-navy-900 tracking-tight leading-[1.1] mb-8 animate-in fade-in slide-in-from-bottom duration-700",
								children: [
									"Karir Impianmu, ",
									/* @__PURE__ */ jsx("br", {}),
									/* @__PURE__ */ jsx("span", {
										className: "bg-linear-to-r from-navy-800 to-teal-500 bg-clip-text text-transparent italic",
										children: "Dibangun dari Data Nyata"
									})
								]
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "max-w-2xl text-slate-500 text-lg md:text-xl leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom duration-1000",
								children: [
									"Aura jenuh belajar apa saja tapi tidak dipanggil interview? ",
									/* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
									"Kami menganalisis skill gap kamu vs pasar kerja IT Indonesia secara real-time."
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col sm:flex-row gap-4 mb-20",
								children: [/* @__PURE__ */ jsxs(Link, {
									href: route("register"),
									className: "group px-8 py-4 bg-navy-900 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-2xl shadow-navy-900/40 hover:scale-105 hover:-translate-y-1 transition-all",
									children: ["Analisis CV Saya", /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform" })]
								}), /* @__PURE__ */ jsx(Link, {
									href: route("demo"),
									className: "px-8 py-4 bg-white text-navy-900 border-2 border-slate-100 rounded-2xl font-bold text-lg hover:border-navy-900 transition-colors",
									children: "Coba Demo"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16",
								children: [
									/* @__PURE__ */ jsx(StatCounter, {
										end: 2847,
										label: "Lowongan Aktif"
									}),
									/* @__PURE__ */ jsx(StatCounter, {
										end: 94,
										label: "Relevansi Data",
										duration: 2e3
									}),
									/* @__PURE__ */ jsx(StatCounter, {
										end: 500,
										label: "Top Skills"
									}),
									/* @__PURE__ */ jsx(StatCounter, {
										end: 120,
										label: "Kota Tercover"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "hidden lg:block",
						children: [
							/* @__PURE__ */ jsx(FloatingCard, {
								className: "top-48 left-20 -rotate-6",
								delay: .2,
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ jsx("div", {
										className: "p-2 bg-teal-500 rounded-lg text-white",
										children: /* @__PURE__ */ jsx(Search, { className: "w-5 h-5" })
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "text-xs font-bold text-black",
										children: "Crawler Active"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-black text-sm",
										children: "300+ Jobs/Day"
									})] })]
								})
							}),
							/* @__PURE__ */ jsx(FloatingCard, {
								className: "top-80 right-20 rotate-12",
								delay: .5,
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ jsx("div", {
										className: "p-2 bg-white rounded-lg text-navy-900",
										children: /* @__PURE__ */ jsx(Target, { className: "w-5 h-5" })
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "text-xs font-bold text-black",
										children: "Market Fit"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-black text-sm",
										children: "87% Success Rate"
									})] })]
								})
							}),
							/* @__PURE__ */ jsx(FloatingCard, {
								className: "bottom-40 left-40 rotate-3",
								delay: .8,
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ jsx("div", {
										className: "p-2 bg-indigo-500 rounded-lg text-white",
										children: /* @__PURE__ */ jsx(Rocket, { className: "w-5 h-5" })
									}), /* @__PURE__ */ jsxs("div", {
										className: "text-left",
										children: [/* @__PURE__ */ jsx("p", {
											className: "text-xs font-bold text-black",
											children: "Level Up"
										}), /* @__PURE__ */ jsx("p", {
											className: "text-black text-sm",
											children: "Adaptive Path"
										})]
									})]
								})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ jsx("section", {
				id: "features",
				className: "py-32 bg-slate-50 relative",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "text-center mb-20",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "text-sm font-black text-teal-600 tracking-[0.2em] uppercase mb-4",
							children: "Features"
						}), /* @__PURE__ */ jsx("h3", {
							className: "text-4xl md:text-5xl font-extrabold text-navy-900",
							children: "Lebih Dari Sekadar AI CV Generator"
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8",
						children: [
							{
								title: "Industry Data Crawler",
								desc: "Sistem kami terus memantau portal kerja utama di Indonesia untuk tren terbaru.",
								icon: Database,
								color: "navy"
							},
							{
								title: "Skill Gap Radar",
								desc: "Bandingkan visualisasi kemampuanmu vs standar industri saat ini lewat Radar Chart.",
								icon: BarChart2,
								color: "teal"
							},
							{
								title: "Dynamic Roadmap",
								desc: "Learning path yang bisa berubah jika ada teknologi baru yang meledak di pasar.",
								icon: Map,
								color: "navy"
							},
							{
								title: "Work Readiness Score",
								desc: "Dapatkan skor kesiapan kerjamu lengkap dengan saran perbaikan yang konkret.",
								icon: Shield,
								color: "teal"
							}
						].map((feature, i) => /* @__PURE__ */ jsxs("div", {
							className: "group p-8 bg-white rounded-3xl border border-slate-100 hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: `w-14 h-14 rounded-2xl mb-8 flex items-center justify-center transition-transform group-hover:scale-110 duration-300 ${feature.color === "teal" ? "bg-teal-50 text-teal-600" : "bg-navy-50 text-navy-700"}`,
									children: /* @__PURE__ */ jsx(feature.icon, { className: "w-7 h-7" })
								}),
								/* @__PURE__ */ jsx("h4", {
									className: "text-xl font-bold text-navy-900 mb-4",
									children: feature.title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-slate-500 leading-relaxed text-sm",
									children: feature.desc
								})
							]
						}, i))
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				id: "how-it-works",
				className: "py-32 bg-white",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "text-center mb-20",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "text-sm font-black text-teal-600 tracking-[0.2em] uppercase mb-4",
							children: "Process"
						}), /* @__PURE__ */ jsx("h3", {
							className: "text-4xl md:text-5xl font-extrabold text-navy-900",
							children: "Dari Mahasiswa Jadi Pro"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "relative flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-0",
						children: [/* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-full -z-10 hidden lg:block" }), [
							{
								step: "01",
								title: "Upload CV",
								desc: "Paste teks CV atau tulis manual target karirmu.",
								emoji: "📄"
							},
							{
								step: "02",
								title: "Analisis AI",
								desc: "AI mendeteksi gap antara skillmu vs lowongan terbanyak.",
								emoji: "🚀"
							},
							{
								step: "03",
								title: "Start Learning",
								desc: "Ikuti roadmap custom & raih skor siap kerja terbaik.",
								emoji: "🎓"
							}
						].map((item, i) => /* @__PURE__ */ jsxs("div", {
							className: "flex-1 max-w-sm flex flex-col items-center text-center px-10",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "w-20 h-20 bg-white rounded-full border-4 border-slate-50 shadow-xl flex items-center justify-center text-4xl mb-8 relative",
									children: [/* @__PURE__ */ jsx("span", {
										className: "absolute -top-2 -right-2 bg-navy-900 text-white text-xs font-black w-8 h-8 rounded-full flex items-center justify-center border-4 border-white",
										children: item.step
									}), item.emoji]
								}),
								/* @__PURE__ */ jsx("h4", {
									className: "text-2xl font-black text-navy-900 mb-4",
									children: item.title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-slate-500 leading-relaxed",
									children: item.desc
								})
							]
						}, i))]
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "py-20 px-4",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-5xl mx-auto bg-navy-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-3xl",
					children: [
						/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-teal-500/20 blur-3xl z-0" }),
						/* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-64 h-64 bg-navy-500/20 blur-3xl z-0" }),
						/* @__PURE__ */ jsxs("div", {
							className: "relative z-10",
							children: [
								/* @__PURE__ */ jsx("h2", {
									className: "text-3xl md:text-5xl font-black text-white mb-8",
									children: "Siap Bersaing di Industri IT 2026?"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-white text-lg md:text-xl mb-12 max-w-2xl mx-auto",
									children: "Tutup gap sekarang, apply dengan percaya diri besok. Ribuan data lowongan sedang menunggumu."
								}),
								/* @__PURE__ */ jsxs(Link, {
									href: route("register"),
									className: "inline-flex items-center gap-3 px-10 py-5 bg-teal-500 text-white rounded-2xl font-black text-xl hover:bg-teal-400 hover:scale-105 transition-all shadow-xl shadow-teal-500/30",
									children: ["Mulai Perjalananmu", /* @__PURE__ */ jsx(ArrowRight, { className: "w-6 h-6" })]
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("footer", {
				className: "py-12 border-t border-slate-100",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx(TrendingUp, { className: "text-navy-900 w-6 h-6" }), /* @__PURE__ */ jsx("span", {
								className: "font-black text-xl text-navy-900 tracking-tighter",
								children: "Kembangin"
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "text-slate-400 text-sm font-medium",
							children: "© 2026 Kembangin. Built for Future Indonesian Talents."
						}),
						/* @__PURE__ */ jsx("div", {
							className: "flex items-center gap-6",
							children: /* @__PURE__ */ jsx("a", {
								href: "#",
								className: "text-slate-400 hover:text-navy-900",
								children: /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5" })
							})
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("style", { children: `
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 4s infinite ease-in-out;
                }
            ` })
		]
	});
}
//#endregion
//#region resources/js/bootstrap.ts
window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
//#endregion
//#region resources/js/app.tsx
var appName = "Kembangin";
createInertiaApp({
	title: (title) => `${title} - ${appName}`,
	resolve: (name) => {
		return (/* @__PURE__ */ Object.assign({
			"./Pages/About.tsx": About_exports,
			"./Pages/Analysis.tsx": Analysis_exports,
			"./Pages/Auth/ConfirmPassword.tsx": ConfirmPassword_exports,
			"./Pages/Auth/ForgotPassword.tsx": ForgotPassword_exports,
			"./Pages/Auth/Login.tsx": Login_exports,
			"./Pages/Auth/Register.tsx": Register_exports,
			"./Pages/Auth/ResetPassword.tsx": ResetPassword_exports,
			"./Pages/Auth/VerifyEmail.tsx": VerifyEmail_exports,
			"./Pages/Blog.tsx": Blog_exports,
			"./Pages/BlogPost.tsx": BlogPost_exports,
			"./Pages/Capstone/Submit.tsx": Submit_exports,
			"./Pages/Dashboard.tsx": Dashboard_exports,
			"./Pages/DashboardFaq.tsx": DashboardFaq_exports,
			"./Pages/Demo.tsx": Demo_exports,
			"./Pages/Error.tsx": Error_exports,
			"./Pages/Faq.tsx": Faq_exports,
			"./Pages/Features.tsx": Features_exports,
			"./Pages/Help.tsx": Help_exports,
			"./Pages/HowItWorks.tsx": HowItWorks_exports,
			"./Pages/Insights.tsx": Insights_exports,
			"./Pages/Landing.tsx": Landing_exports,
			"./Pages/Leaderboard.tsx": Leaderboard_exports,
			"./Pages/Market.tsx": Market_exports,
			"./Pages/Notifications.tsx": Notifications_exports,
			"./Pages/Onboarding.tsx": Onboarding_exports,
			"./Pages/Profile/Edit.tsx": Edit_exports,
			"./Pages/Profile/Partials/DeleteUserForm.tsx": DeleteUserForm_exports,
			"./Pages/Profile/Partials/UpdatePasswordForm.tsx": UpdatePasswordForm_exports,
			"./Pages/Profile/Partials/UpdateProfileInformationForm.tsx": UpdateProfileInformationForm_exports,
			"./Pages/Profile/Portfolio.tsx": Portfolio_exports,
			"./Pages/Profile/Public.tsx": Public_exports,
			"./Pages/Profile.tsx": Profile_exports,
			"./Pages/ProfileDetail.tsx": ProfileDetail_exports,
			"./Pages/Roadmap.tsx": Roadmap_exports,
			"./Pages/Settings.tsx": Settings_exports,
			"./Pages/Welcome.tsx": Welcome_exports
		}))[`./Pages/${name}.tsx`];
	},
	setup({ el, App, props }) {
		createRoot(el).render(/* @__PURE__ */ jsx(App, { ...props }));
	},
	progress: { color: "#4B5563" }
});
//#endregion
export {};
